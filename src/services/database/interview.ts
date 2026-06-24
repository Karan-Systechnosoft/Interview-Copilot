import { createClient } from '@/lib/supabase/server';

export async function getUserSessions() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) return [];

  const { data: sessions, error } = await supabase
    .from('ic_interview_session')
    .select('*, ic_job_descriptions(title, company_name)')
    .eq('user_id', user.id)
    .order('started_at', { ascending: false });

  if (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }

  return sessions || [];
}

export async function createInterviewSession(data: { jdId: string, type: string, mode: string }) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("Unauthorized");

  // First create the Session
  const { data: session, error: sessionError } = await supabase
    .from('ic_interview_session')
    .insert([{
      user_id: user.id,
      job_description_id: data.jdId,
      interview_type: data.type,
      interview_mode: data.mode,
      status: 'SCHEDULED',
      is_active: true,
    }])
    .select()
    .single();

  if (sessionError) throw sessionError;

  // Then create the Conversation linked to the Session
  const { data: conversation, error: convError } = await supabase
    .from('ic_conversation')
    .insert([{
      user_id: user.id,
      job_description_id: data.jdId,
      interview_session_id: session.id,
      title: `${data.type} Conversation`,
      conversation_type: 'MOCK_INTERVIEW',
      status: 'ACTIVE',
      is_active: true,
    }])
    .select()
    .single();

  if (convError) throw convError;

  return { session, conversation };
}

export async function getSessionWithMessages(sessionId: string) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data: session, error: sessionError } = await supabase
    .from('ic_interview_session')
    .select('*, ic_job_descriptions(*)')
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .single();

  if (sessionError) return null;

  // Find the conversation
  const { data: conversation } = await supabase
    .from('ic_conversation')
    .select('*')
    .eq('interview_session_id', sessionId)
    .single();

  if (!conversation) return { session, messages: [] };

  // Fetch messages
  const { data: messages } = await supabase
    .from('ic_messages')
    .select('*')
    .eq('conversation_id', conversation.id)
    .order('id', { ascending: true });

  return { session, conversation, messages: messages || [] };
}
