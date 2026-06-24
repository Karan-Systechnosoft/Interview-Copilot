import { NextResponse } from 'next/server';
import { getUserProfile } from '@/services/database/user';
import { analyzeJd } from '@/services/ai/jd-analyzer';
import { createJD } from '@/services/database/jd';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    let text = formData.get('text') as string;
    const file = formData.get('file') as File;

    if (!text && !file) {
      return NextResponse.json({ error: "No text or file provided." }, { status: 400 });
    }

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (file.type === 'application/pdf') {
        const pdfParse = require('pdf-parse');
        const pdfData = await pdfParse(buffer);
        text = pdfData.text;
      } else {
        text = buffer.toString('utf-8');
      }
    }

    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Could not extract text." }, { status: 400 });
    }

    const userProfile = await getUserProfile();
    if (!userProfile) {
      return NextResponse.json({ error: "Unauthorized or profile not found." }, { status: 401 });
    }

    const profileText = `
      Name: ${userProfile.profile.name}
      Summary: ${userProfile.profile.profile_summary}
      Total Exp (Months): ${userProfile.profile.total_exp}
      
      Experiences:
      ${userProfile.experiences.map((e: any) => `- ${e.job_title} at ${e.company_name} (${e.start_date} to ${e.end_date}): ${e.responsibilities}`).join('\n')}
      
      Projects:
      ${userProfile.projects.map((p: any) => `- ${p.title} using ${p.technologies}: ${p.description}`).join('\n')}
    `;

    const analysis = await analyzeJd(text, profileText);

    const newJd = await createJD({
      title: analysis.title,
      company_name: analysis.company_name,
      job_summary: analysis.job_summary,
      candidate_score: analysis.candidate_score,
      extracted_skills: analysis.extracted_skills,
      matched_skills: analysis.matched_skills,
      missing_skills: analysis.missing_skills,
      suggestions: analysis.suggestions
    });

    return NextResponse.json({ success: true, data: newJd });
  } catch (error: any) {
    console.error("API /api/parse/jd failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
