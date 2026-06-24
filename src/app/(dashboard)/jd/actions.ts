'use server';

import { getUserProfile } from '@/services/database/user';
import { analyzeJd } from '@/services/ai/jd-analyzer';
import { createJD } from '@/services/database/jd';

export async function processJdAction(jdText: string) {
  try {
    const userProfile = await getUserProfile();
    if (!userProfile) {
      throw new Error("Unauthorized or profile not found.");
    }

    // Build a quick string of the candidate's profile to pass to the AI
    const profileText = `
      Name: ${userProfile.profile.name}
      Summary: ${userProfile.profile.profile_summary}
      Total Exp (Months): ${userProfile.profile.total_exp}
      
      Experiences:
      ${userProfile.experiences.map((e: any) => `- ${e.job_title} at ${e.company_name} (${e.start_date} to ${e.end_date}): ${e.responsibilities}`).join('\n')}
      
      Projects:
      ${userProfile.projects.map((p: any) => `- ${p.title} using ${p.technologies}: ${p.description}`).join('\n')}
    `;

    // 1. Analyze with AI
    const analysis = await analyzeJd(jdText, profileText);

    // 2. Save to DB
    const newJd = await createJD({
      title: analysis.title,
      company_name: analysis.company_name,
      job_summary: analysis.job_summary,
      candidate_score: analysis.candidate_score
    });

    return { success: true, data: newJd };
  } catch (error: any) {
    console.error("processJdAction failed:", error);
    return { success: false, error: error.message };
  }
}



export async function processJdFileAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error("No file uploaded.");

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
      throw new Error("Could not extract any text from the file.");
    }

    // Call the original action
    return await processJdAction(text);
  } catch (error: any) {
    console.error("processJdFileAction failed:", error);
    return { success: false, error: error.message };
  }
}
