-- ====================================================================
-- PHASE 4 SCHEMA MIGRATION: AI EDUCATIONAL PLATFORM & INTELLIGENT RAG
-- ====================================================================

-- 1. AI CONVERSATION SESSIONS (Study Assistant & Tutor)
CREATE TABLE IF NOT EXISTS public.ai_conversation_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  subject_name TEXT,
  class_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_sessions_user ON public.ai_conversation_sessions(user_id);

-- 2. AI CONVERSATION MESSAGES (Persistent chat history with citations)
CREATE TABLE IF NOT EXISTS public.ai_conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.ai_conversation_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  is_hint BOOLEAN NOT NULL DEFAULT false,
  is_simplified BOOLEAN NOT NULL DEFAULT false,
  citations JSONB DEFAULT '[]'::jsonb,
  related_resource_ids JSONB DEFAULT '[]'::jsonb,
  suggested_follow_ups JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_messages_session ON public.ai_conversation_messages(session_id);

-- 3. DOCUMENT CHUNKS (RAG retrieval index for approved school documents)
CREATE TABLE IF NOT EXISTS public.document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID REFERENCES public.learning_resources(id) ON DELETE CASCADE,
  document_title TEXT NOT NULL,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  topic TEXT NOT NULL,
  section_title TEXT NOT NULL,
  content TEXT NOT NULL,
  tokens_count INT NOT NULL DEFAULT 0,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chunks_subject ON public.document_chunks(subject_id);
CREATE INDEX IF NOT EXISTS idx_chunks_class ON public.document_chunks(class_id);
CREATE INDEX IF NOT EXISTS idx_chunks_public ON public.document_chunks(is_public);

-- 4. AI QUIZ GENERATION DRAFTS (Teacher review workspace before saving)
CREATE TABLE IF NOT EXISTS public.ai_quiz_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  request_params JSONB NOT NULL,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_drafts_teacher ON public.ai_quiz_drafts(teacher_id);

-- 5. PERSONALISED LEARNING RECOMMENDATIONS
CREATE TABLE IF NOT EXISTS public.student_ai_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('short_lesson', 'practice_quiz', 'game_drill', 'library_resource')),
  title TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  action_url TEXT NOT NULL,
  rationale TEXT NOT NULL,
  trigger_quiz_id UUID REFERENCES public.quizzes(id) ON DELETE SET NULL,
  is_dismissed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_recommendations_student ON public.student_ai_recommendations(student_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_dismissed ON public.student_ai_recommendations(student_id, is_dismissed);

-- 6. CYBERSECURITY SUSPICIOUS MESSAGE ANALYSIS LOGS
CREATE TABLE IF NOT EXISTS public.cyber_analysis_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  message_excerpt TEXT NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low_concern', 'medium_concern', 'high_risk_alert')),
  risk_score INT NOT NULL,
  indicators JSONB NOT NULL DEFAULT '[]'::jsonb,
  analyzed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ====================================================================
-- ROW LEVEL SECURITY POLICIES (PHASE 4)
-- ====================================================================

ALTER TABLE public.ai_conversation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_quiz_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cyber_analysis_logs ENABLE ROW LEVEL SECURITY;

-- 1. Conversation Sessions: Users can only see their own AI sessions
CREATE POLICY "Users can manage own AI sessions" ON public.ai_conversation_sessions
  FOR ALL USING (auth.uid() = user_id);

-- 2. Conversation Messages: Access scoped through parent session
CREATE POLICY "Users can manage own session messages" ON public.ai_conversation_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.ai_conversation_sessions s
      WHERE s.id = session_id AND s.user_id = auth.uid()
    )
  );

-- 3. Document Chunks: Public chunks are visible to all; Private chunks visible to authorized classes/teachers
CREATE POLICY "Public chunks accessible by anyone" ON public.document_chunks
  FOR SELECT USING (is_public = true);

CREATE POLICY "Class chunks accessible by enrolled scholars" ON public.document_chunks
  FOR SELECT USING (
    class_id IS NULL OR EXISTS (
      SELECT 1 FROM public.student_enrollments se
      JOIN public.students s ON s.id = se.student_id
      JOIN public.sections sec ON sec.id = se.section_id
      WHERE s.profile_id = auth.uid() AND sec.class_id = document_chunks.class_id
    ) OR EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('administrator', 'teacher')
    )
  );

-- 4. Quiz Drafts: Teachers can only view and manage their own generated quiz drafts
CREATE POLICY "Teachers can manage own quiz drafts" ON public.ai_quiz_drafts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.teachers t
      WHERE t.id = teacher_id AND t.profile_id = auth.uid()
    )
  );

-- 5. Personalised Recommendations: Students can only view their own recommendations
CREATE POLICY "Students can access own recommendations" ON public.student_ai_recommendations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = student_id AND s.profile_id = auth.uid()
    )
  );

-- 6. Cyber Analysis Logs: Users access their own, Admins review all
CREATE POLICY "Users access own cyber logs" ON public.cyber_analysis_logs
  FOR SELECT USING (
    user_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'administrator'
    )
  );
