import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

export interface JdAnalysisResult {
  title: string;
  company_name: string;
  job_summary: string;
  candidate_score: number;
  extracted_skills: string[];
  matched_skills: string[];
  missing_skills: string[];
  suggestions: string[];
}

const JD_ANALYSIS_PROMPT = `
You are an expert ATS and technical recruiter. 
You are given a Job Description and a Candidate's Profile.
Your task is to analyze the JD, extract its key details, extract the required skills, and match them against the candidate's skills and experience.

Calculate the candidate_score (0 to 100) specifically based on the percentage of extracted_skills that the candidate possesses (matched_skills), heavily weighting must-have core skills and experience match.

Provide 2-3 specific suggestions for how the candidate can improve their chances (e.g., "Add GraphQL to your resume", "Highlight system design in your current role").

Return ONLY a valid JSON object exactly adhering to this schema:
{
  "title": "string (The job title)",
  "company_name": "string (The company name, or 'Unknown' if not specified)",
  "job_summary": "string (A 2-3 sentence summary of the role and key requirements)",
  "candidate_score": number (0 to 100, based on skill match ratio),
  "extracted_skills": ["string", "string"] (ONLY extract hard technical skills, tools, frameworks, and languages. DO NOT extract generic soft skills like Communication, Problem-solving, or Detail Oriented),
  "matched_skills": ["string", "string"] (Skills the candidate HAS based on their profile),
  "missing_skills": ["string", "string"] (Skills from the JD the candidate is MISSING),
  "suggestions": ["string", "string"] (Actionable suggestions to improve their profile/resume for this specific JD)
}
Do not wrap in markdown tags like \`\`\`json. Return raw JSON.
`;

export async function analyzeJd(jdText: string, candidateProfileText: string): Promise<JdAnalysisResult> {
  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!groqKey && !geminiKey && !openaiKey) {
    return {
      title: "Extracted Job Title",
      company_name: "Extracted Company",
      job_summary: "Fallback summary due to missing API keys. " + jdText.slice(0, 50),
      candidate_score: 85,
      extracted_skills: ["React", "Node.js"],
      matched_skills: ["React"],
      missing_skills: ["Node.js"],
      suggestions: ["Learn Node.js"]
    };
  }

  const prompt = `${JD_ANALYSIS_PROMPT}\n\n[JOB description]\n${jdText}\n\n[CANDIDATE PROFILE]\n${candidateProfileText}`;

  try {
    let raw = "";

    if (groqKey) {
      console.log("[analyzeJd] Using Groq API");
      const client = new OpenAI({ apiKey: groqKey, baseURL: "https://api.groq.com/openai/v1" });
      const completion = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      });
      raw = completion.choices[0]?.message?.content || "";
    } 
    else if (openaiKey) {
      console.log("[analyzeJd] Using OpenAI API");
      const client = new OpenAI({ apiKey: openaiKey });
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      });
      raw = completion.choices[0]?.message?.content || "";
    }
    else if (geminiKey) {
      console.log("[analyzeJd] Using Gemini API");
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: { responseMimeType: 'application/json', temperature: 0.2 },
      });
      const result = await model.generateContent(prompt);
      raw = result.response.text();
    }
    
    raw = raw.trim();
    if (raw.startsWith('```')) {
      raw = raw.replace(/^```[a-z]*\n?/i, '').replace(/```\s*$/i, '').trim();
    }
    
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to analyze JD with AI:", error);
    throw error;
  }
}
