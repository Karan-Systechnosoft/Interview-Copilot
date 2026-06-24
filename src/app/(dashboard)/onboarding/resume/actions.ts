'use server';

import { resumeAiParser } from '@/services/resume/ai-parser';
import { updateResumeData } from '@/services/database/user';

export async function processResumeFileAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error("No file uploaded.");
    }

    let text = "";
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (file.type === 'application/pdf') {
      const pdfParse = require('pdf-parse');
      const pdfData = await pdfParse(buffer);
      text = pdfData.text;
    } else {
      // Assume text-based file (txt, markdown, etc)
      text = buffer.toString('utf-8');
    }

    if (!text || text.trim() === "") {
      throw new Error("Could not extract any text from the file.");
    }

    // Call the AI Parser (Groq/Gemini/OpenAI)
    // The parser automatically falls back to env vars
    const parsedData = await resumeAiParser.parseResumeText(text);

    // Save to database
    await updateResumeData(parsedData);

    return { success: true };
  } catch (error: any) {
    console.error("processResumeFileAction failed:", error);
    return { success: false, error: error.message };
  }
}
