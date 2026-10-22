import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export async function GET() {
  const memory = process.memoryUsage();
  const uptime = process.uptime();

  const supabaseConfigured = isSupabaseConfigured();
  const aiKeyConfigured = Boolean(
    process.env.FAST_SUPER_API_KEY ||
    process.env.GROQ_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.OPENAI_API_KEY
  );

  const healthData = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(uptime),
    environment: process.env.NODE_ENV || "production",
    version: "1.0.0",
    system: {
      platform: process.platform,
      nodeVersion: process.version,
    },
    checks: {
      application: {
        status: "pass",
        message: "Govt. Boys Qazi Sultan Higher Secondary School, Kunri core web service active",
      },
      database: {
        status: "pass",
        provider: supabaseConfigured ? "Supabase PostgreSQL" : "Local Memory Store Fallback",
        configured: supabaseConfigured,
      },
      aiEngine: {
        status: "pass",
        provider: aiKeyConfigured ? "Fast & Super API / Google Gemini / OpenAI" : "Deterministic Offline RAG Fallback",
        configured: aiKeyConfigured,
      },
      memory: {
        status: memory.heapUsed < 800 * 1024 * 1024 ? "pass" : "warn",
        heapUsedMb: Math.round(memory.heapUsed / 1024 / 1024),
        heapTotalMb: Math.round(memory.heapTotal / 1024 / 1024),
        rssMb: Math.round(memory.rss / 1024 / 1024),
      },
    },
  };

  return NextResponse.json(healthData, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
