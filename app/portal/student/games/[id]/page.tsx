"use client";

import React, { useState, useEffect, use } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import { GameSession, GameType } from "@/types/portal";
import {
  Gamepad2,
  ShieldAlert,
  Clock,
  Trophy,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  X,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

interface GamePlayPageProps {
  params: Promise<{ id: string }>;
}

interface GameQuestionItem {
  id: number;
  question: string;
  contextScenario?: string;
  options: string[];
  correctIndex: number;
  hint?: string;
  explanation: string;
}

const GAME_QUESTIONS: Record<GameType, GameQuestionItem[]> = {
  knowledge_challenge: [
    {
      id: 1,
      question: "Which particle is responsible for carrying electrical charge in an electric circuit?",
      options: ["Proton", "Neutron", "Electron", "Positron"],
      correctIndex: 2,
      explanation: "Electrons are negatively charged subatomic particles whose drift flow constitutes electric current in metallic conductors.",
    },
    {
      id: 2,
      question: "What is the derivative of f(x) = 3x² with respect to x?",
      options: ["3x", "6x", "6x²", "9x"],
      correctIndex: 1,
      explanation: "Using the power rule: d/dx(3x²) = 3 * 2x = 6x.",
    },
    {
      id: 3,
      question: "Which literary device involves attributing human traits or emotions to non-human objects?",
      options: ["Metaphor", "Alliteration", "Personification", "Hyperbole"],
      correctIndex: 2,
      explanation: "Personification endows inanimate objects or abstract ideas with human attributes and feelings.",
    },
    {
      id: 4,
      question: "In computer science, what does the acronym 'RAM' stand for?",
      options: ["Random Access Memory", "Readily Available Microcode", "Rapid Array Module", "Read Always Memory"],
      correctIndex: 0,
      explanation: "RAM stands for Random Access Memory, high-speed volatile storage accessed directly by the CPU.",
    },
    {
      id: 5,
      question: "What is the primary gas found in Earth's atmosphere by volume?",
      options: ["Oxygen (21%)", "Nitrogen (78%)", "Carbon Dioxide (0.04%)", "Argon (0.93%)"],
      correctIndex: 1,
      explanation: "Nitrogen comprises approximately 78% of Earth's atmosphere, followed by oxygen at approximately 21%.",
    },
  ],
  topic_mastery: [
    {
      id: 1,
      question: "What is the net acceleration of an object travelling in a straight line at a constant velocity of 25 m/s?",
      options: ["25 m/s²", "9.8 m/s²", "0 m/s²", "50 m/s²"],
      correctIndex: 2,
      hint: "Remember: acceleration is defined as the time rate of change of velocity (a = dv/dt).",
      explanation: "Since velocity is constant, there is zero change in velocity over time, meaning acceleration is exactly 0 m/s².",
    },
    {
      id: 2,
      question: "If mass is tripled while net force remains constant, how does acceleration change?",
      options: ["Triples", "Reduces to one-third", "Remains unchanged", "Doubles"],
      correctIndex: 1,
      hint: "Rearrange Newton's Second Law: a = F / m.",
      explanation: "Because acceleration is inversely proportional to mass for a constant force, tripling the mass reduces acceleration to 1/3 of its original value.",
    },
    {
      id: 3,
      question: "Which of the following is true regarding static friction vs. kinetic friction between two surfaces?",
      options: [
        "Kinetic friction is always greater than static friction",
        "Maximum static friction is typically greater than kinetic friction",
        "Both coefficients of friction are always equal",
        "Friction forces depend strictly on surface area",
      ],
      correctIndex: 1,
      hint: "Think about whether it is harder to start moving a heavy box or to keep it sliding.",
      explanation: "Microscopic surface irregularities interlock at rest, so the maximum coefficient of static friction is greater than the coefficient of kinetic friction.",
    },
    {
      id: 4,
      question: "What force provides the centripetal acceleration for a satellite orbiting Earth in a stable circular trajectory?",
      options: ["Atmospheric drag", "Electromagnetic attraction", "Earth's gravitational force", "Centrifugal repulsion"],
      correctIndex: 2,
      hint: "Which fundamental attraction pulls massive bodies toward each other across space?",
      explanation: "Earth's gravitational attraction acts radially inward toward Earth's center, providing the necessary centripetal force for circular orbit.",
    },
    {
      id: 5,
      question: "Work done on an object by a constant force is zero when the angle between force and displacement vectors is:",
      options: ["0 degrees (parallel)", "45 degrees", "90 degrees (perpendicular)", "180 degrees (antiparallel)"],
      correctIndex: 2,
      hint: "Recall the dot product definition: W = F · d = F * d * cos(θ). What is cos(90°)?",
      explanation: "cos(90°) = 0, so when a force acts perpendicularly to the direction of motion, it performs zero mechanical work.",
    },
  ],
  cybersafe_challenge: [
    {
      id: 1,
      contextScenario: "Email Subject: URGENT: Mandatory School Account Verification Required within 2 Hours!\nFrom: it-admin@oakridge-support-team.tk\nBody: Dear student, your school email and portal access will be terminated unless you verify your password immediately by clicking the secure link below: http://portal-oakridge.secure-auth.tk/login",
      question: "You received the message shown above. What is the most critical warning sign that indicates this is a phishing scam?",
      options: [
        "The message is sent during school hours",
        "The sender domain is .tk (suspicious free domain) and uses artificial panic/urgency",
        "The message contains the word 'student'",
        "The email is formatted in plain text",
      ],
      correctIndex: 1,
      hint: "Examine the sender's domain address and notice the aggressive time pressure.",
      explanation: "Phishing attackers use high-pressure urgency ('within 2 hours') and deceptive lookalike domains (e.g. .tk). Legitimate school administrators will never threaten immediate account deletion via unverified links.",
    },
    {
      id: 2,
      contextScenario: "SMS Notification: 'Congratulations! You were randomly selected for the $5,000 National Merit Scholarship. To claim your prize funds, reply with your full legal name, date of birth, home address, and mother's maiden name.'",
      question: "What is the safest and most appropriate action to take regarding this scholarship text?",
      options: [
        "Reply with all information quickly before the scholarship expires",
        "Ask the sender to send the funds via gift card",
        "Delete the message and report it as spam; legitimate scholarships require formal applications and never request confidential identity questions via random SMS",
        "Forward the message to your friends so they can claim it too",
      ],
      correctIndex: 2,
      hint: "Legitimate scholarships are awarded through verified academic applications, not random lottery SMS messages asking for identity theft answers.",
      explanation: "Authentic merit scholarships never award random cash via SMS or request mother's maiden name (a security question often used for account takeovers).",
    },
    {
      id: 3,
      contextScenario: "Scenario: You are creating a password for your school portal account.",
      question: "Which of the following represents the strongest password practice?",
      options: [
        "Using your birthday and pet's name (e.g. Fluffy2010)",
        "Using 'Password123!' so you do not forget it",
        "A 16+ character passphrase combining unrelated words, numbers, and symbols with Multi-Factor Authentication enabled",
        "Writing your password on a sticky note attached to your school laptop",
      ],
      correctIndex: 2,
      hint: "Length and entropy trump simple dictionary substitutions. MFA adds an indispensable second layer of defense.",
      explanation: "Long passphrases have exponential combinations, making brute-force cracking virtually impossible, especially when paired with MFA.",
    },
    {
      id: 4,
      contextScenario: "Physical Scenario: You find an unmarked, high-capacity USB thumb drive on a desk in the school computer laboratory labeled 'Student Final Exams & Answers 2026'.",
      question: "What should you do with this discovered USB drive?",
      options: [
        "Plug it into a school computer immediately to see whose files are on it",
        "Plug it into your personal home computer where you have antivirus installed",
        "Do not plug it in anywhere; hand it directly to the school IT department or lab supervisor",
        "Copy all files to your cloud storage before formatting it",
      ],
      correctIndex: 2,
      hint: "'USB Drop Attacks' are a common real-world penetration and malware technique designed to exploit curiosity.",
      explanation: "Plugging in an untrusted USB drive can execute automated BadUSB payloads or install malware. Always hand found storage devices directly to IT staff.",
    },
    {
      id: 5,
      contextScenario: "Network Scenario: You are at a public cafe and notice an open, unencrypted Wi-Fi network named 'Free_HighSpeed_Student_WiFi'.",
      question: "When connecting to an unsecured public Wi-Fi network, which practice is essential for safeguarding your login credentials?",
      options: [
        "Turn your screen brightness to maximum",
        "Only enter passwords if the website uses HTTPS (padlock icon) and preferably route sensitive school access through a secure VPN",
        "Disable your operating system firewall so you can browse faster",
        "Share the network password with other people at the cafe",
      ],
      correctIndex: 1,
      hint: "Unencrypted Wi-Fi allows eavesdroppers to sniff plain text traffic unless encrypted by HTTPS or a VPN tunnel.",
      explanation: "Unsecured public Wi-Fi is vulnerable to packet sniffing and Man-in-the-Middle (MitM) attacks. HTTPS and VPNs encrypt data in transit.",
    },
  ],
};

export default function StudentGamePlayPage({ params }: GamePlayPageProps) {
  const { id } = use(params) as { id: GameType };
  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance
  const gameDefs = schoolStore.getGameDefinitions();
  const currentGameDef = gameDefs.find((g) => g.id === id);

  const questions = GAME_QUESTIONS[id] || GAME_QUESTIONS.knowledge_challenge;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedSession, setCompletedSession] = useState<GameSession | null>(null);

  // Time tracker
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  if (!currentGameDef) {
    return (
      <PortalLayout
        requiredRole="student"
        breadcrumbs={[
          { label: "Scholar Portal", href: "/portal/student" },
          { label: "Educational Games", href: "/portal/student/games" },
        ]}
      >
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <Gamepad2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-800">Game Not Found</h2>
          <Button href="/portal/student/games" variant="primary" size="sm" className="mt-4">
            Return to Games Center
          </Button>
        </div>
      </PortalLayout>
    );
  }

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (optionIdx: number) => {
    if (hasAnsweredCurrent) return;

    setSelectedOption(optionIdx);
    setHasAnsweredCurrent(true);

    const isCorrect = optionIdx === currentQ.correctIndex;
    if (isCorrect) {
      const points = 20 + streak * 5;
      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnsweredCurrent(false);
      setShowHint(false);
    } else {
      // Complete Game Session & Record through Backend
      setIsCompleted(true);
      const session = schoolStore.recordGameSession({
        gameId: id,
        studentId,
        score,
        questionsAnswered: questions.length,
        correctAnswers: correctCount,
        timeSpentSeconds: timeSpent,
        topic: currentGameDef.title,
      });
      setCompletedSession(session);
    }
  };

  const handleRestartGame = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnsweredCurrent(false);
    setShowHint(false);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setTimeSpent(0);
    setIsCompleted(false);
    setCompletedSession(null);
  };

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Educational Games", href: "/portal/student/games" },
        { label: currentGameDef.title, href: `/portal/student/games/${id}` },
      ]}
      title={currentGameDef.title}
      description={currentGameDef.description}
      actions={
        <Button href="/portal/student/games" variant="outline" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
          Exit Game
        </Button>
      }
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Game Stat Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Item {currentIndex + 1} of {questions.length}</span>
            <span className="text-slate-300">•</span>
            <span className="text-sky-700 flex items-center gap-1 font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              {score} Points
            </span>
          </div>

          <div className="flex items-center gap-3">
            {streak > 1 && (
              <Badge variant="accent" size="sm" className="animate-bounce">
                🔥 {streak}x Streak!
              </Badge>
            )}
            <span className="font-mono text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {timeSpent}s
            </span>
          </div>
        </div>

        {/* Completion Screen */}
        {isCompleted && completedSession ? (
          <Card className="bg-white border-slate-200 overflow-hidden shadow-lg animate-in fade-in-50">
            <div className="h-3 w-full bg-gradient-to-r from-amber-400 via-sky-500 to-indigo-600" />
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto shadow-sm text-amber-500">
                <Trophy className="w-10 h-10" />
              </div>

              <div className="space-y-1.5">
                <Badge variant="navy" size="sm">
                  CHALLENGE COMPLETED
                </Badge>
                <h2 className="text-2xl font-extrabold text-[#0f2744]">
                  Challenge Complete!
                </h2>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your performance has been recorded to your learning ledger and credited towards your scholar rank.
                </p>
              </div>

              {/* Game Stats Metrics */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Score</span>
                  <span className="text-2xl font-extrabold text-sky-700">{score}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
                  <span className="text-2xl font-extrabold text-emerald-700">
                    {completedSession.accuracy_percentage}%
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Time</span>
                  <span className="text-2xl font-extrabold text-slate-700">{timeSpent}s</span>
                </div>
              </div>

              {/* Reward Notification */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 text-xs text-sky-900 flex items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-sky-600 shrink-0" />
                  <div>
                    <strong className="block font-bold">Learning Points & Badges Awarded</strong>
                    <span className="text-sky-700">
                      +{completedSession.accuracy_percentage >= 80 ? 50 : 30} XP added to your personal progress ledger.
                    </span>
                  </div>
                </div>
                <Button href="/portal/student/progress" variant="outline" size="sm" className="bg-white shrink-0">
                  View Progress
                </Button>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <Button onClick={handleRestartGame} variant="outline" size="md" leftIcon={<RotateCcw className="w-4 h-4" />}>
                  Play Again
                </Button>
                <Button href="/portal/student/games" variant="primary" size="md">
                  Game Center Catalog
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Active Question Card */
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="p-6 pb-4 border-b border-slate-100 flex flex-row items-center justify-between">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                Question {currentIndex + 1} of {questions.length}
              </span>
              {currentQ.hint && !showHint && !hasAnsweredCurrent && (
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Reveal Hint</span>
                </button>
              )}
            </CardHeader>

            <CardContent className="p-6 space-y-5">
              {/* Scenario Context Box (especially for CyberSafe challenge) */}
              {currentQ.contextScenario && (
                <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono border border-slate-800 space-y-1.5 shadow-inner">
                  <div className="flex items-center gap-1.5 text-sky-400 font-bold uppercase text-[10px] tracking-wider">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Simulated Real-World Case Scenario</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300 leading-relaxed">
                    {currentQ.contextScenario}
                  </pre>
                </div>
              )}

              <h3 className="text-base font-extrabold text-[#0f2744] leading-snug">
                {currentQ.question}
              </h3>

              {/* Hint Box */}
              {showHint && currentQ.hint && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 animate-in fade-in">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Pedagogical Hint:</strong>
                    <span>{currentQ.hint}</span>
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === currentQ.correctIndex;

                  let btnStyle = "border-slate-200 hover:border-slate-300 text-slate-700 bg-white";
                  if (hasAnsweredCurrent) {
                    if (isCorrect) {
                      btnStyle = "border-emerald-400 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-200";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "border-rose-400 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-200";
                    } else {
                      btnStyle = "border-slate-200 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={hasAnsweredCurrent}
                      onClick={() => handleSelectAnswer(optIdx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {hasAnsweredCurrent && (
                        <span>
                          {isCorrect ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : isSelected ? (
                            <X className="w-4 h-4 text-rose-600" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Post-Answer Explanation Box */}
              {hasAnsweredCurrent && (
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-xs text-sky-950 space-y-1 animate-in fade-in">
                  <div className="flex items-center gap-1.5 font-bold text-sky-800">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>Explanation & Core Concept:</span>
                  </div>
                  <p className="text-sky-900 leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {/* Next Button */}
              {hasAnsweredCurrent && (
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <Button
                    onClick={handleNextQuestion}
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {currentIndex < questions.length - 1 ? "Next Question" : "Complete Challenge"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </PortalLayout>
  );
}
