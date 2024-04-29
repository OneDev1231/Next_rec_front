import { NextRequest, NextResponse } from 'next/server'
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET_KEY,
});

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const audio = formData.get("audio") as Blob;

  if (audio) {
    const audioBuffer = await audio.arrayBuffer();
    const nodeBuffer = Buffer.from(audioBuffer);
    const tempFilePath = `/tmp/tmp.${ audio.type.split("/")[1] }`
    await fs.writeFileSync(tempFilePath, nodeBuffer)
  
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: "whisper-1",
    });
  
    return NextResponse.json(transcription.text);
  } else {
    // Could not process the request
    return NextResponse.json(null);
  }
}