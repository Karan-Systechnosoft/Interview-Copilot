import { createClient } from '@/lib/supabase/server';

export async function getUserJDs() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) return [];

  const { data: jds, error } = await supabase
    .from('ic_job_descriptions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching JDs:", error);
    return [];
  }

  return jds || [];
}

export async function getJDById(id: string) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data: jd, error } = await supabase
    .from('ic_job_descriptions')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error("Error fetching JD:", error);
    return null;
  }

  return jd;
}

export async function createJD(jdData: any) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from('ic_job_descriptions')
    .insert([
      {
        user_id: user.id,
        title: jdData.title,
        company_name: jdData.company_name,
        job_summary: jdData.job_summary,
        candidate_score: jdData.candidate_score,
        must_have_text: JSON.stringify(jdData.extracted_skills || []),
        nice_to_have_text: JSON.stringify(jdData.missing_skills || []),
        responsibilities_text: JSON.stringify({ matched: jdData.matched_skills || [], suggestions: jdData.suggestions || [] }),
        is_active: true,
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
