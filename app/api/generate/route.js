import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const systemPrompt = `You are a flashcard generator. Given a broad topic or term provided by the user (e.g., "plants"), create exactly 10 flashcards. 
Each flashcard should feature a term or concept related to the given topic on the front, and a brief explanation or definition of that term/concept on the back. 
Ensure that the flashcards cover different important aspects or key details related to the topic.
Return the flashcards in the following JSON format:
{
  "flashcards":[
    {
      "front": "term or concept",
      "back": "short explanation or definition"
    }
  ]
}`;

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const data = await req.text();
  const completion = await model.generateContent([systemPrompt, ...data]);

  let content = completion.response.candidates[0].content.parts[0].text.trim();
  content = content.replace(/```json/g, "").replace(/```/g, "");

  const flashcards = JSON.parse(content);

  return NextResponse.json(flashcards.flashcards);
}
