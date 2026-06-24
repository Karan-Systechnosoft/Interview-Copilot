export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      IC_USERS: {
        Row: {
          id: string
          name: string | null
          email: string
          PHONE: string | null
          title: string | null
          total_exp: number | null
          RELEVANT_EXP: number | null
          profile_summary: string | null
          LOCATION: string | null
          SOURCE_RESUME_URL: string | null
          RESUME_PARSED_AT: string | null
          PROFILE_VERSION: number | null
          is_active: boolean | null
          created_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_USERS']['Row']>
        Update: Partial<Database['public']['Tables']['IC_USERS']['Row']>
      }
      IC_CONVERSATION: {
        Row: {
          id: string
          user_id: string
          job_description_id: string | null
          interview_session_id: string | null
          title: string | null
          CONVERSATION_TYPE: string | null
          SELECTED_USER_LLM_ID: string | null
          SELECTED_REF_LLM_ID: string | null
          SYSTEM_PROMPT_ID: string | null
          status: string | null
          is_active: boolean | null
          started_at: string | null
          ENDED_AT: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_CONVERSATION']['Row']>
        Update: Partial<Database['public']['Tables']['IC_CONVERSATION']['Row']>
      }
      IC_SKILLS: {
        Row: {
          id: string
          SKILL_NAME: string
          CATEGORY: string | null
          description: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_SKILLS']['Row']>
        Update: Partial<Database['public']['Tables']['IC_SKILLS']['Row']>
      }
      IC_SKILLS_MAPPING: {
        Row: {
          id: string
          SKILL_ID: string
          ENTITY_TYPE: string | null
          ENTITY_ID: string | null
          SKILL_SOURCE: string | null
          SKILL_LEVEL: string | null
          YEARS_EXP: number | null
          IS_REQUIRED: boolean | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_SKILLS_MAPPING']['Row']>
        Update: Partial<Database['public']['Tables']['IC_SKILLS_MAPPING']['Row']>
      }
      IC_EDUCATION: {
        Row: {
          id: string
          user_id: string
          QUALIFICATION_LEVEL: string | null
          degree: string | null
          field_of_study: string | null
          INSTITUTE_NAME: string | null
          UNIVERSITY_NAME: string | null
          start_year: number | null
          end_year: number | null
          GRADE_OR_PERCENTAGE: string | null
          IS_HIGHEST: boolean | null
          sort_order: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_EDUCATION']['Row']>
        Update: Partial<Database['public']['Tables']['IC_EDUCATION']['Row']>
      }
      IC_EXPERIENCE: {
        Row: {
          id: string
          user_id: string
          company_name: string | null
          job_title: string | null
          EMPLOYMENT_TYPE: string | null
          LOCATION: string | null
          start_date: string | null
          end_date: string | null
          IS_CURRENT: boolean | null
          DURATION_MONTHS: number | null
          responsibilities: string | null
          TECHNOLOGIES_USED: string | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_EXPERIENCE']['Row']>
        Update: Partial<Database['public']['Tables']['IC_EXPERIENCE']['Row']>
      }
      IC_PROJECTS: {
        Row: {
          id: string
          user_id: string
          title: string | null
          description: string | null
          technologies: string | null
          DURATION: string | null
          role: string | null
          project_url: string | null
          is_active: boolean | null
          sort_order: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_PROJECTS']['Row']>
        Update: Partial<Database['public']['Tables']['IC_PROJECTS']['Row']>
      }
      IC_CERTIFICATES: {
        Row: {
          id: string
          user_id: string
          CERTIFICATE_NAME: string | null
          ISSUER: string | null
          ISSUE_ON: string | null
          EXPIRY_ON: string | null
          DOES_NOT_EXPIRE: boolean | null
          CREDENTIAL_ID: string | null
          certificate_url: string | null
          is_active: boolean | null
          sort_order: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_CERTIFICATES']['Row']>
        Update: Partial<Database['public']['Tables']['IC_CERTIFICATES']['Row']>
      }
      IC_SOCIAL_LINKS: {
        Row: {
          id: string
          user_id: string
          LINK_TYPE: string | null
          URL: string | null
          DISPLAY_LABEL: string | null
          IS_PRIMARY: boolean | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_SOCIAL_LINKS']['Row']>
        Update: Partial<Database['public']['Tables']['IC_SOCIAL_LINKS']['Row']>
      }
      IC_MESSAGES: {
        Row: {
          id: string
          conversation_id: string
          role: string | null
          CONTENT: string | null
          CONTENT_TYPE: string | null
          TOKEN_INPUT: number | null
          TOKEN_OUTPUT: number | null
          LATENCY_MS: number | null
          LLM_RESPONSE_ID: string | null
          PARENT_MESSAGE_ID: string | null
          is_active: boolean | null
        }
        Insert: Partial<Database['public']['Tables']['IC_MESSAGES']['Row']>
        Update: Partial<Database['public']['Tables']['IC_MESSAGES']['Row']>
      }
      IC_DOCUMENTS: {
        Row: {
          id: string
          DOCUMENT_TYPE: string | null
          FILE_NAME: string | null
          FILE_URL: string | null
          MIME_TYPE: string | null
          FILE_SIZE: number | null
          EXTRACTED_TEXT: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
          ENTITY_TYPE: string | null
          ENTITY_ID: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_DOCUMENTS']['Row']>
        Update: Partial<Database['public']['Tables']['IC_DOCUMENTS']['Row']>
      }
      ic_job_descriptions: {
        Row: {
          id: string
          user_id: string
          title: string | null
          company_name: string | null
          CODE: string | null
          LOCATION: string | null
          WORK_MODE: string | null
          EMPLOYMENT_TYPE: string | null
          EXP_MIN_MONTHS: number | null
          EXP_MAX_MONTHS: number | null
          must_have_text: string | null
          nice_to_have_text: string | null
          job_summary: string | null
          responsibilities_text: string | null
          candidate_score: number | null
          status: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
          CREATED_BY: string | null
          UPDATED_BY: string | null
        }
        Insert: Partial<Database['public']['Tables']['ic_job_descriptions']['Row']>
        Update: Partial<Database['public']['Tables']['ic_job_descriptions']['Row']>
      }
      IC_INTERVIEW_SESSION: {
        Row: {
          id: string
          user_id: string
          job_description_id: string | null
          INTERVIEW_TYPE: string | null
          title: string | null
          company_name: string | null
          ROLE_TITLE: string | null
          INTERVIEW_MODE: string | null
          SCHEDULED_FOR: string | null
          started_at: string | null
          ENDED_AT: string | null
          status: string | null
          RESULT: string | null
          NOTES: string | null
          is_active: boolean | null
        }
        Insert: Partial<Database['public']['Tables']['IC_INTERVIEW_SESSION']['Row']>
        Update: Partial<Database['public']['Tables']['IC_INTERVIEW_SESSION']['Row']>
      }
      IC_SPEECH_TO_TEXT: {
        Row: {
          id: string
          user_id: string
          conversation_id: string
          interview_session_id: string | null
          MESSAGE_ID: string | null
          PROVIDER_NAME: string | null
          SOURCE_TYPE: string | null
          AUDIO_FILE_URL: string | null
          TRANSCRIPT_TEXT: string | null
          LANGUAGE: string | null
          CONFIDENCE_SCORE: number | null
          started_at: string | null
          ENDED_AT: string | null
          created_at: string | null
          is_active: boolean | null
        }
        Insert: Partial<Database['public']['Tables']['IC_SPEECH_TO_TEXT']['Row']>
        Update: Partial<Database['public']['Tables']['IC_SPEECH_TO_TEXT']['Row']>
      }
    }
  }
}
