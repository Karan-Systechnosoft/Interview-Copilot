import { NextResponse } from 'next/server';
import { resumeAiParser } from '@/services/resume/ai-parser';
import { updateResumeData } from '@/services/database/user';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    let text = "";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (file.type === 'application/pdf') {
      const pdfParse = require('pdf-parse');
      const pdfData = await pdfParse(buffer);
      text = pdfData.text;
    } else {
      text = buffer.toString('utf-8');
    }

    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Could not extract any text from the file." }, { status: 400 });
    }

    // Call the AI Parser using Groq by default
    const parsedData = await resumeAiParser.parseResumeText(text, 'groq');

    // Save to database
    await updateResumeData(parsedData);

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("API /api/parse/resume failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
