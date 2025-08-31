// @ts-nocheck
import { serve } from "https://deno.land/std/http/server.ts";

// simple in-memory rate limiting per IP
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;
const requestCounts = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }
  if (entry.count >= MAX_REQUESTS) return true;
  entry.count++;
  return false;
}

serve(async (req) => {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { matchId } = await req.json();
    if (typeof matchId !== "string" || !matchId.trim()) {
      return new Response(
        JSON.stringify({ error: "matchId must be a non-empty string" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const prompt =
      `Напиши короткий дружелюбный ледокол для начала общения. matchId: ${matchId}`;
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    console.log(`Icebreaker request from ${ip} for match ${matchId}`);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 60,
      }),
    });
    const data = await response.json();
    const text =
      data.choices?.[0]?.message?.content?.trim() ||
      "Привет! Как проходит твой день?";

    return new Response(JSON.stringify({ icebreaker: text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
