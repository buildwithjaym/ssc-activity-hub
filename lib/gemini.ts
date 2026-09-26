import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function askGemini(prompt: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash-lite",
  });

  const result = await model.generateContent(prompt);

  return result.response.text();
}