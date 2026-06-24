import { createClient } from '@/lib/supabase/server';

export async function getUserProfile() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  // Fetch basic profile
  const { data: profile } = await supabase
    .from('ic_users')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch associated experiences, education, projects, certificates, social links, and skills
  const [
    { data: experiences },
    { data: education },
    { data: projects },
    { data: certificates },
    { data: socialLinks },
    { data: skillsMapping },
  ] = await Promise.all([
    supabase.from('ic_experience').select('*').eq('user_id', user.id).order('sort_order', { ascending: true }),
    supabase.from('ic_education').select('*').eq('user_id', user.id).order('sort_order', { ascending: true }),
    supabase.from('ic_projects').select('*').eq('user_id', user.id).order('sort_order', { ascending: true }),
    supabase.from('ic_certificates').select('*').eq('user_id', user.id).order('sort_order', { ascending: true }),
    supabase.from('ic_social_links').select('*').eq('user_id', user.id).order('sort_order', { ascending: true }),
    supabase.from('ic_skills_mapping').select('*, ic_skills(*)').eq('entity_id', user.id).eq('entity_type', 'user')
  ]);

  return {
    profile,
    experiences: experiences || [],
    education: education || [],
    projects: projects || [],
    certificates: certificates || [],
    socialLinks: socialLinks || [],
    skills: skillsMapping?.map((m: any) => m.ic_skills?.skill_name).filter(Boolean) || []
  };
}

export async function updateResumeData(parsedResume: any) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("Unauthorized");

  // Upsert basic profile data
  const { error: profileError } = await supabase.from('ic_users').upsert({
    id: user.id,
    name: parsedResume.full_name,
    email: parsedResume.email,
    phone: parsedResume.phone,
    location: parsedResume.location,
    profile_summary: parsedResume.summary,
    total_exp: parsedResume.total_experience_months || 0,
    is_active: true,
  });

  if (profileError) throw profileError;

  // For related tables, a simple strategy is to delete existing and re-insert, 
  // or we can implement an intricate merge. We'll do delete-and-replace for the prototype
  // Helper functions to clean data for Supabase
  const parseDate = (d: any) => {
    if (!d || typeof d !== 'string') return null;
    const lower = d.toLowerCase().trim();
    if (lower === 'present' || lower === 'current' || lower === '') return null;
    
    // Convert to YYYY-MM-DD for Postgres
    const parsed = new Date(d.trim());
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split('T')[0];
    }
    return null;
  };

  const parseYear = (y: any) => {
    if (!y || typeof y !== 'string') return null;
    const match = y.match(/\b(19|20)\d{2}\b/);
    return match ? parseInt(match[0], 10) : null;
  };

  const employmentData = parsedResume.employment || parsedResume.experience || parsedResume.work_experience || [];
  await supabase.from('ic_experience').delete().eq('user_id', user.id);
  if (employmentData && employmentData.length > 0) {
    const exps = employmentData.map((exp: any, idx: number) => {
      const end_date = parseDate(exp.end_date || exp.endDate);
      return {
        user_id: user.id,
        company_name: exp.company || exp.company_name || exp.organization || 'Unknown',
        job_title: exp.title || exp.job_title || exp.role || 'Unknown',
        start_date: parseDate(exp.start_date || exp.startDate),
        end_date,
        is_current: !end_date, // if end_date is null, assume they still work there
        responsibilities: exp.description || exp.responsibilities || exp.summary || '',
        is_active: true,
        sort_order: idx
      };
    });
    const { error } = await supabase.from('ic_experience').insert(exps);
    if (error) throw new Error(`Experience Insert Error: ${error.message}`);
  }

  const educationData = parsedResume.education || parsedResume.academics || [];
  await supabase.from('ic_education').delete().eq('user_id', user.id);
  if (educationData && educationData.length > 0) {
    const edus = educationData.map((edu: any, idx: number) => ({
      user_id: user.id,
      degree: edu.degree || edu.qualification || 'Unknown',
      field_of_study: edu.field_of_study || edu.major || '',
      institute_name: edu.institution || edu.university || edu.college || 'Unknown',
      start_year: parseYear(edu.start_year || edu.startYear),
      end_year: parseYear(edu.end_year || edu.endYear),
      sort_order: idx
    }));
    const { error } = await supabase.from('ic_education').insert(edus);
    if (error) throw new Error(`Education Insert Error: ${error.message}`);
  }

  const projectsData = parsedResume.projects || parsedResume.portfolio_projects || parsedResume.academic_projects || [];
  await supabase.from('ic_projects').delete().eq('user_id', user.id);
  if (projectsData && projectsData.length > 0) {
    const projs = projectsData.map((proj: any, idx: number) => ({
      user_id: user.id,
      title: proj.title || proj.project_name || proj.name || 'Unknown',
      description: proj.description || proj.summary || '',
      technologies: Array.isArray(proj.technologies) 
        ? proj.technologies 
        : (typeof proj.technologies === 'string' ? proj.technologies.split(',').map((s: string) => s.trim()) : []),
      duration: proj.duration || proj.timeline || null, // Changed from '' to null to avoid type issues if it's a date/interval
      role: proj.role || proj.responsibility || '',
      project_url: proj.project_url || proj.link || proj.url || '',
      sort_order: idx,
      is_active: true
    }));
    const { error } = await supabase.from('ic_projects').insert(projs);
    if (error) throw new Error(`Projects Insert Error: ${error.message}`);
  }

  // Social Links
  const linksData = [];
  if (parsedResume.linkedin_url) linksData.push({ user_id: user.id, link_type: 'linkedin', url: parsedResume.linkedin_url, display_label: 'LinkedIn', is_active: true, sort_order: 1 });
  if (parsedResume.github_url) linksData.push({ user_id: user.id, link_type: 'github', url: parsedResume.github_url, display_label: 'GitHub', is_active: true, sort_order: 2 });
  if (parsedResume.portfolio_url) linksData.push({ user_id: user.id, link_type: 'portfolio', url: parsedResume.portfolio_url, display_label: 'Portfolio', is_active: true, sort_order: 3 });

  await supabase.from('ic_social_links').delete().eq('user_id', user.id);
  if (linksData.length > 0) {
    const { error } = await supabase.from('ic_social_links').insert(linksData);
    if (error) throw new Error(`Social Links Insert Error: ${error.message}`);
  }

  // Skills
  const rawSkillsData = parsedResume.skills || [];
  
  // Clean the skills array: some AI models still group them by commas despite the prompt (e.g., "React, Node.js")
  // We split by commas and strip any leading category prefixes like "Frontend: " or "Frontend - "
  const skillsData = rawSkillsData
    .flatMap((s: string) => typeof s === 'string' ? s.split(',') : [])
    .map((s: string) => s.replace(/^.*?[:–-]\s*/, '').trim()) // strips "Frontend: " or "Backend - "
    .filter(Boolean);

  if (skillsData.length > 0) {
    // 1. Fetch existing skills to avoid unique constraint errors if any
    const { data: existingSkills } = await supabase.from('ic_skills').select('id, skill_name').in('skill_name', skillsData);
    const existingSkillNames = existingSkills?.map(s => s.skill_name.toLowerCase()) || [];
    
    // 2. Identify and insert missing skills
    const missingSkills = skillsData
      .filter((s: string) => typeof s === 'string' && !existingSkillNames.includes(s.toLowerCase()))
      .map((s: string) => ({ skill_name: s, is_active: true }));
      
    let allSkills = [...(existingSkills || [])];
    
    if (missingSkills.length > 0) {
      const { data: insertedSkills, error: insertSkillError } = await supabase.from('ic_skills').insert(missingSkills).select('id, skill_name');
      if (insertSkillError) {
        console.warn('Failed to insert new skills, continuing with existing:', insertSkillError);
      } else if (insertedSkills) {
        allSkills = [...allSkills, ...insertedSkills];
      }
    }
    
    // 3. Map skills to user
    await supabase.from('ic_skills_mapping').delete().eq('entity_id', user.id).eq('entity_type', 'user');
    
    const mappings = allSkills.map(skill => ({
      skill_id: skill.id,
      entity_type: 'user',
      entity_id: user.id,
      is_active: true
    }));
    
    if (mappings.length > 0) {
      const { error: mappingError } = await supabase.from('ic_skills_mapping').insert(mappings);
      if (mappingError) throw new Error(`Skills Mapping Insert Error: ${mappingError.message}`);
    }
  }

  return { success: true };
}
