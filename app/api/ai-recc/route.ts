import { generateReccAI } from "@/services/reccs/create";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const promptText = data.promptText;

  const aiResult = await generateReccAI({ promptText });

  return NextResponse.json(aiResult);
}