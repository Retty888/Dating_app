// @ts-nocheck
import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  try {
    const { matchId } = await req.json();
    const prompt = `Напиши короткий дружелюбный ледокол для начала общения. matchId: ${matchId}`;
    const apiKey = Deno.env.get("OPENAI_API_KEY");
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
