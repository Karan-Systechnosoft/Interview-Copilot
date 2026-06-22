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
          ID: string
          NAME: string | null
          EMAIL: string
          PHONE: string | null
          TITLE: string | null
          TOTAL_EXP: number | null
          RELEVANT_EXP: number | null
          PROFILE_SUMMARY: string | null
          LOCATION: string | null
          SOURCE_RESUME_URL: string | null
          RESUME_PARSED_AT: string | null
          PROFILE_VERSION: number | null
          IS_ACTIVE: boolean | null
          CREATED_AT: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_USERS']['Row']>
        Update: Partial<Database['public']['Tables']['IC_USERS']['Row']>
      }
      IC_CONVERSATION: {
        Row: {
          ID: string
          USER_ID: string
          JOB_DESCRIPTION_ID: string | null
          INTERVIEW_SESSION_ID: string | null
          TITLE: string | null
          CONVERSATION_TYPE: string | null
          SELECTED_USER_LLM_ID: string | null
          SELECTED_REF_LLM_ID: string | null
          SYSTEM_PROMPT_ID: string | null
          STATUS: string | null
          IS_ACTIVE: boolean | null
          STARTED_AT: string | null
          ENDED_AT: string | null
          CREATED_AT: string | null
          UPDATED_AT: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_CONVERSATION']['Row']>
        Update: Partial<Database['public']['Tables']['IC_CONVERSATION']['Row']>
      }
      IC_SKILLS: {
        Row: {
          ID: string
          SKILL_NAME: string
          CATEGORY: string | null
          DESCRIPTION: string | null
          IS_ACTIVE: boolean | null
          CREATED_AT: string | null
          UPDATED_AT: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_SKILLS']['Row']>
        Update: Partial<Database['public']['Tables']['IC_SKILLS']['Row']>
      }
      IC_SKILLS_MAPPING: {
        Row: {
          ID: string
          SKILL_ID: string
          ENTITY_TYPE: string | null
          ENTITY_ID: string | null
          SKILL_SOURCE: string | null
          SKILL_LEVEL: string | null
          YEARS_EXP: number | null
          IS_REQUIRED: boolean | null
          IS_ACTIVE: boolean | null
          CREATED_AT: string | null
          UPDATED_AT: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_SKILLS_MAPPING']['Row']>
        Update: Partial<Database['public']['Tables']['IC_SKILLS_MAPPING']['Row']>
      }
      IC_EDUCATION: {
        Row: {
          ID: string
          USER_ID: string
          QUALIFICATION_LEVEL: string | null
          DEGREE: string | null
          FIELD_OF_STUDY: string | null
          INSTITUTE_NAME: string | null
          UNIVERSITY_NAME: string | null
          START_YEAR: number | null
          END_YEAR: number | null
          GRADE_OR_PERCENTAGE: string | null
          IS_HIGHEST: boolean | null
          SORT_ORDER: number | null
          CREATED_AT: string | null
          UPDATED_AT: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_EDUCATION']['Row']>
        Update: Partial<Database['public']['Tables']['IC_EDUCATION']['Row']>
      }
      IC_EXPERIENCE: {
        Row: {
          ID: string
          USER_ID: string
          COMPANY_NAME: string | null
          JOB_TITLE: string | null
          EMPLOYMENT_TYPE: string | null
          LOCATION: string | null
          START_DATE: string | null
          END_DATE: string | null
          IS_CURRENT: boolean | null
          DURATION_MONTHS: number | null
          RESPONSIBILITIES: string | null
          TECHNOLOGIES_USED: string | null
          SORT_ORDER: number | null
          IS_ACTIVE: boolean | null
          CREATED_AT: string | null
          UPDATED_AT: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_EXPERIENCE']['Row']>
        Update: Partial<Database['public']['Tables']['IC_EXPERIENCE']['Row']>
      }
      IC_PROJECTS: {
        Row: {
          ID: string
          USER_ID: string
          TITLE: string | null
          DESCRIPTION: string | null
          TECHNOLOGIES: string | null
          DURATION: string | null
          ROLE: string | null
          PROJECT_URL: string | null
          IS_ACTIVE: boolean | null
          SORT_ORDER: number | null
          CREATED_AT: string | null
          UPDATED_AT: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_PROJECTS']['Row']>
        Update: Partial<Database['public']['Tables']['IC_PROJECTS']['Row']>
      }
      IC_CERTIFICATES: {
        Row: {
          ID: string
          USER_ID: string
          CERTIFICATE_NAME: string | null
          ISSUER: string | null
          ISSUE_ON: string | null
          EXPIRY_ON: string | null
          DOES_NOT_EXPIRE: boolean | null
          CREDENTIAL_ID: string | null
          CERTIFICATE_URL: string | null
          IS_ACTIVE: boolean | null
          SORT_ORDER: number | null
          CREATED_AT: string | null
          UPDATED_AT: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_CERTIFICATES']['Row']>
        Update: Partial<Database['public']['Tables']['IC_CERTIFICATES']['Row']>
      }
      IC_SOCIAL_LINKS: {
        Row: {
          ID: string
          USER_ID: string
          LINK_TYPE: string | null
          URL: string | null
          DISPLAY_LABEL: string | null
          IS_PRIMARY: boolean | null
          SORT_ORDER: number | null
          IS_ACTIVE: boolean | null
          CREATED_AT: string | null
          UPDATED_AT: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_SOCIAL_LINKS']['Row']>
        Update: Partial<Database['public']['Tables']['IC_SOCIAL_LINKS']['Row']>
      }
      IC_MESSAGES: {
        Row: {
          ID: string
          CONVERSATION_ID: string
          ROLE: string | null
          CONTENT: string | null
          CONTENT_TYPE: string | null
          TOKEN_INPUT: number | null
          TOKEN_OUTPUT: number | null
          LATENCY_MS: number | null
          LLM_RESPONSE_ID: string | null
          PARENT_MESSAGE_ID: string | null
          IS_ACTIVE: boolean | null
        }
        Insert: Partial<Database['public']['Tables']['IC_MESSAGES']['Row']>
        Update: Partial<Database['public']['Tables']['IC_MESSAGES']['Row']>
      }
      IC_DOCUMENTS: {
        Row: {
          ID: string
          DOCUMENT_TYPE: string | null
          FILE_NAME: string | null
          FILE_URL: string | null
          MIME_TYPE: string | null
          FILE_SIZE: number | null
          EXTRACTED_TEXT: string | null
          IS_ACTIVE: boolean | null
          CREATED_AT: string | null
          UPDATED_AT: string | null
          ENTITY_TYPE: string | null
          ENTITY_ID: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_DOCUMENTS']['Row']>
        Update: Partial<Database['public']['Tables']['IC_DOCUMENTS']['Row']>
      }
      IC_JOB_DESCRIPTIONS: {
        Row: {
          ID: string
          USER_ID: string
          TITLE: string | null
          COMPANY_NAME: string | null
          CODE: string | null
          LOCATION: string | null
          WORK_MODE: string | null
          EMPLOYMENT_TYPE: string | null
          EXP_MIN_MONTHS: number | null
          EXP_MAX_MONTHS: number | null
          MUST_HAVE_TEXT: string | null
          NICE_TO_HAVE_TEXT: string | null
          JOB_SUMMARY: string | null
          RESPONSIBILITIES_TEXT: string | null
          CANDIDATE_SCORE: number | null
          STATUS: string | null
          IS_ACTIVE: boolean | null
          CREATED_AT: string | null
          UPDATED_AT: string | null
          CREATED_BY: string | null
          UPDATED_BY: string | null
        }
        Insert: Partial<Database['public']['Tables']['IC_JOB_DESCRIPTIONS']['Row']>
        Update: Partial<Database['public']['Tables']['IC_JOB_DESCRIPTIONS']['Row']>
      }
      IC_INTERVIEW_SESSION: {
        Row: {
          ID: string
          USER_ID: string
          JOB_DESCRIPTION_ID: string | null
          INTERVIEW_TYPE: string | null
          TITLE: string | null
          COMPANY_NAME: string | null
          ROLE_TITLE: string | null
          INTERVIEW_MODE: string | null
          SCHEDULED_FOR: string | null
          STARTED_AT: string | null
          ENDED_AT: string | null
          STATUS: string | null
          RESULT: string | null
          NOTES: string | null
          IS_ACTIVE: boolean | null
        }
        Insert: Partial<Database['public']['Tables']['IC_INTERVIEW_SESSION']['Row']>
        Update: Partial<Database['public']['Tables']['IC_INTERVIEW_SESSION']['Row']>
      }
      IC_SPEECH_TO_TEXT: {
        Row: {
          ID: string
          USER_ID: string
          CONVERSATION_ID: string
          INTERVIEW_SESSION_ID: string | null
          MESSAGE_ID: string | null
          PROVIDER_NAME: string | null
          SOURCE_TYPE: string | null
          AUDIO_FILE_URL: string | null
          TRANSCRIPT_TEXT: string | null
          LANGUAGE: string | null
          CONFIDENCE_SCORE: number | null
          STARTED_AT: string | null
          ENDED_AT: string | null
          CREATED_AT: string | null
          IS_ACTIVE: boolean | null
        }
        Insert: Partial<Database['public']['Tables']['IC_SPEECH_TO_TEXT']['Row']>
        Update: Partial<Database['public']['Tables']['IC_SPEECH_TO_TEXT']['Row']>
      }
    }
  }
}
