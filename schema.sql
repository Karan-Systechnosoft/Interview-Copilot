-- Initial Schema for Interview Copilot

-- Create extension for UUIDs if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ic_users
CREATE TABLE IF NOT EXISTS public.ic_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    title TEXT,
    total_exp NUMERIC,
    relevant_exp NUMERIC,
    profile_summary TEXT,
    location TEXT,
    source_resume_url TEXT,
    resume_parsed_at TIMESTAMPTZ,
    profile_version INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ic_education
CREATE TABLE IF NOT EXISTS public.ic_education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.ic_users(id) ON DELETE CASCADE,
    qualification_level TEXT,
    degree TEXT,
    field_of_study TEXT,
    institute_name TEXT,
    university_name TEXT,
    start_year INT,
    end_year INT,
    grade_or_percentage TEXT,
    is_highest BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ic_experience
CREATE TABLE IF NOT EXISTS public.ic_experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.ic_users(id) ON DELETE CASCADE,
    company_name TEXT,
    job_title TEXT,
    employment_type TEXT,
    location TEXT,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    duration_months INT,
    responsibilities TEXT,
    technologies_used TEXT[],
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ic_projects
CREATE TABLE IF NOT EXISTS public.ic_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.ic_users(id) ON DELETE CASCADE,
    title TEXT,
    description TEXT,
    technologies TEXT[],
    duration TEXT,
    role TEXT,
    project_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ic_certificates
CREATE TABLE IF NOT EXISTS public.ic_certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.ic_users(id) ON DELETE CASCADE,
    certificate_name TEXT,
    issuer TEXT,
    issue_on DATE,
    expiry_on DATE,
    does_not_expire BOOLEAN DEFAULT FALSE,
    credential_id TEXT,
    certificate_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ic_social_links
CREATE TABLE IF NOT EXISTS public.ic_social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.ic_users(id) ON DELETE CASCADE,
    link_type TEXT,
    url TEXT,
    display_label TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ic_skills
CREATE TABLE IF NOT EXISTS public.ic_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_name TEXT UNIQUE,
    category TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ic_skills_mapping
CREATE TABLE IF NOT EXISTS public.ic_skills_mapping (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id UUID REFERENCES public.ic_skills(id) ON DELETE CASCADE,
    entity_type TEXT,
    entity_id UUID,
    skill_source TEXT,
    skill_level TEXT,
    years_exp NUMERIC,
    is_required BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ic_job_descriptions
CREATE TABLE IF NOT EXISTS public.ic_job_descriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.ic_users(id) ON DELETE CASCADE,
    title TEXT,
    company_name TEXT,
    code TEXT,
    location TEXT,
    work_mode TEXT,
    employment_type TEXT,
    exp_min_months INT,
    exp_max_months INT,
    must_have_text TEXT,
    nice_to_have_text TEXT,
    job_summary TEXT,
    responsibilities_text TEXT,
    candidate_score NUMERIC,
    status TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- ic_interview_session
CREATE TABLE IF NOT EXISTS public.ic_interview_session (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.ic_users(id) ON DELETE CASCADE,
    job_description_id UUID REFERENCES public.ic_job_descriptions(id) ON DELETE SET NULL,
    interview_type TEXT,
    title TEXT,
    company_name TEXT,
    role_title TEXT,
    interview_mode TEXT,
    scheduled_for TIMESTAMPTZ,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    status TEXT,
    result TEXT,
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- ic_user_prompts
CREATE TABLE IF NOT EXISTS public.ic_user_prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.ic_users(id) ON DELETE CASCADE,
    name TEXT,
    description TEXT,
    prompt_text TEXT,
    category TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ic_ref_llm
CREATE TABLE IF NOT EXISTS public.ic_ref_llm (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_name TEXT,
    model_name TEXT,
    display_name TEXT,
    base_url TEXT,
    supports_text BOOLEAN DEFAULT TRUE,
    supports_image BOOLEAN DEFAULT FALSE,
    supports_audio BOOLEAN DEFAULT FALSE,
    supports_streaming BOOLEAN DEFAULT TRUE,
    max_tokens INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ic_user_llm
CREATE TABLE IF NOT EXISTS public.ic_user_llm (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.ic_users(id) ON DELETE CASCADE,
    ref_llm_id UUID REFERENCES public.ic_ref_llm(id) ON DELETE CASCADE,
    api_key_ref TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);

-- ic_conversation
CREATE TABLE IF NOT EXISTS public.ic_conversation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.ic_users(id) ON DELETE CASCADE,
    job_description_id UUID REFERENCES public.ic_job_descriptions(id) ON DELETE SET NULL,
    interview_session_id UUID REFERENCES public.ic_interview_session(id) ON DELETE CASCADE,
    title TEXT,
    conversation_type TEXT,
    selected_user_llm_id UUID REFERENCES public.ic_user_llm(id) ON DELETE SET NULL,
    selected_ref_llm_id UUID REFERENCES public.ic_ref_llm(id) ON DELETE SET NULL,
    system_prompt_id UUID REFERENCES public.ic_user_prompts(id) ON DELETE SET NULL,
    status TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ic_messages
CREATE TABLE IF NOT EXISTS public.ic_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES public.ic_conversation(id) ON DELETE CASCADE,
    role TEXT,
    content TEXT,
    content_type TEXT,
    token_input INT,
    token_output INT,
    latency_ms INT,
    llm_response_id TEXT,
    parent_message_id UUID REFERENCES public.ic_messages(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- ic_speech_to_text
CREATE TABLE IF NOT EXISTS public.ic_speech_to_text (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.ic_users(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES public.ic_conversation(id) ON DELETE CASCADE,
    interview_session_id UUID REFERENCES public.ic_interview_session(id) ON DELETE CASCADE,
    message_id UUID REFERENCES public.ic_messages(id) ON DELETE SET NULL,
    provider_name TEXT,
    source_type TEXT,
    audio_file_url TEXT,
    transcript_text TEXT,
    language TEXT,
    confidence_score NUMERIC,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- ic_documents
CREATE TABLE IF NOT EXISTS public.ic_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_type TEXT,
    file_name TEXT,
    file_url TEXT,
    mime_type TEXT,
    file_size INT,
    extracted_text TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    entity_type TEXT,
    entity_id UUID
);