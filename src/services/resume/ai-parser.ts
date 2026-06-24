import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

export interface ParsedResume {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  summary: string;
  skills: string[];
  education: any[];
  employment: any[];
  certifications: any[];
  projects?: any[];
  total_experience_months: number;
  current_ctc?: number;
  expected_ctc?: number;
  notice_period_days?: number;
}
 
const RESUME_PARSE_PROMPT = `
You are an expert ATS (Applicant Tracking System) resume parser.
Your task is to extract structured fields from the provided resume text.
You must recognize common project headings such as: Projects, Academic Projects, Personal Projects, Professional Projects, Key Projects, Portfolio, Case Studies, and extract relevant details.
You must return ONLY a valid JSON object adhering exactly to the following schema:
{
  "full_name": "string",
  "email": "string",
  "phone": "string",
  "location": "string",
  "linkedin_url": "string",
  "github_url": "string",
  "portfolio_url": "string",
  "summary": "string (MUST be in bullet points, starting with •)",
  "skills": ["string", "string"] (Extract INDIVIDUAL tools, languages, and frameworks. Do NOT group them by category. E.g. instead of 'Frontend - React, CSS', output 'React', 'CSS' separately),
  "education": [{"degree": "string", "field_of_study": "string", "institution": "string", "start_year": "string (Format: 'Mon YYYY', e.g. 'Jan 2018')", "end_year": "string (Format: 'Mon YYYY', e.g. 'May 2022')"}],
  "employment": [{"title": "string", "company": "string", "start_date": "string (Format: 'Mon YYYY')", "end_date": "string (Format: 'Mon YYYY' or 'Present')", "description": "string (MUST be in bullet points)"}],
  "certifications": [{"name": "string", "issuer": "string", "issued_on": "string (Format: 'Mon YYYY')", "expiry_on": "string (Format: 'Mon YYYY' or 'Present')"}],
  "projects": [{"title": "string (Project Title/Name)", "description": "string (Project Description)", "technologies": ["string", "string"] or "string (comma-separated list of technologies used)", "duration": "string (Duration, e.g. 'Jan 2025 - Apr 2025' or '2024')", "role": "string (Role in project)", "project_url": "string (Project link or GitHub link if available)"}],
  "total_experience_months": number,
  "current_ctc": number,
  "expected_ctc": number,
  "notice_period_days": number
}
If a field is not present in the resume, return an empty string, empty array, or 0.
Bullet points should be concise and professional.
Do not wrap the JSON in Markdown formatting. Return the raw JSON object only.
`.trim();

export class ResumeAiParserService {
  async parseResumeText(
    text: string, 
    provider: 'gemini' | 'openai' | 'groq' = 'gemini', 
    apiKey?: string, 
    model?: string, 
    baseUrl?: string
  ): Promise<ParsedResume> {
    
    // Default to environment variables if not provided
    const effectiveProvider = provider.toLowerCase();
    
    let effectiveApiKey = apiKey;
    if (!effectiveApiKey) {
      if (effectiveProvider === 'gemini') effectiveApiKey = process.env.GEMINI_API_KEY;
      if (effectiveProvider === 'openai') effectiveApiKey = process.env.OPENAI_API_KEY;
      if (effectiveProvider === 'groq') effectiveApiKey = process.env.GROQ_API_KEY;
    }
    
    let effectiveModel = model;
    if (!effectiveModel) {
      if (effectiveProvider === 'gemini') effectiveModel = 'gemini-1.5-flash';
      if (effectiveProvider === 'openai') effectiveModel = 'gpt-4o-mini';
      if (effectiveProvider === 'groq') effectiveModel = 'llama-3.1-8b-instant';
    }

    let effectiveBaseUrl = baseUrl;
    if (effectiveProvider === 'groq' && !effectiveBaseUrl) {
      effectiveBaseUrl = 'https://api.groq.com/openai/v1';
    }

    console.log(`[ResumeAiParserService] Parsing request - provider: ${effectiveProvider}, model: ${effectiveModel}`);

    if (!effectiveApiKey) {
      throw new Error(`Provider "${effectiveProvider}" is selected but no valid API key was found in environment variables or parameters.`);
    }

    if (effectiveProvider === 'gemini') {
      return this.callGemini(text, effectiveApiKey, effectiveModel);
    } else {
      // Groq uses the exact same OpenAI compatibility layer
      return this.callOpenAiCompat(text, effectiveApiKey, effectiveBaseUrl, effectiveModel);
    }
  }

  private async callGemini(text: string, apiKey: string, model: string): Promise<ParsedResume> {
    console.log(`[ResumeAiParserService] Calling Gemini API - model: ${model}`);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const geminiModel = genAI.getGenerativeModel({
        model,
        generationConfig: { responseMimeType: 'application/json', temperature: 0.1 },
      });

      const result = await geminiModel.generateContent(`${RESUME_PARSE_PROMPT}\n\nResume Text:\n${text}`);
      const raw = result.response.text();
      if (!raw) throw new Error('Gemini returned empty content.');
      return this.parseJson(raw);
    } catch (error: any) {
      console.error(`[ResumeAiParserService] Gemini API request failed: ${error.message}`);
      throw error;
    }
  }

  private async callOpenAiCompat(
    text: string,
    apiKey: string,
    baseUrl: string | undefined,
    model: string,
  ): Promise<ParsedResume> {
    console.log(`[ResumeAiParserService] Calling OpenAI-compatible API - baseUrl: ${baseUrl || 'default'}, model: ${model}`);
    try {
      const client = new OpenAI({ apiKey, baseURL: baseUrl });
      const completion = await client.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: RESUME_PARSE_PROMPT },
          { role: 'user',   content: text },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      });

      const raw = completion.choices[0]?.message?.content;
      if (!raw) throw new Error(`OpenAI-compatible provider returned an empty response.`);
      return this.parseJson(raw);
    } catch (error: any) {
      console.error(`[ResumeAiParserService] OpenAI-compatible API request failed: ${error.message}`);
      throw error;
    }
  }

  private parseJson(raw: string): ParsedResume {
    let cleaned = raw.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```[a-z]*\n?/i, '').replace(/```\s*$/i, '').trim();
    }
    try {
      return JSON.parse(cleaned);
    } catch {
      throw new Error(
        `Failed to parse JSON from AI provider response. Raw snippet: ${cleaned.slice(0, 200)}`,
      );
    }
  }
}

export const resumeAiParser = new ResumeAiParserService();
