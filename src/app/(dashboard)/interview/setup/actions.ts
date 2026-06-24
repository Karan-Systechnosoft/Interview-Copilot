'use server';

import { createInterviewSession } from '@/services/database/interview';

export async function setupSessionAction(jdId: string, type: string, mode: string) {
  try {
    const { session, conversation } = await createInterviewSession({ jdId, type, mode });
    return { success: true, sessionId: session.id };
  } catch (error: any) {
    console.error("setupSessionAction failed:", error);
    return { success: false, error: error.message };
  }
}
