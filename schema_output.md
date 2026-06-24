=== SHEET: Summary ===
Table,Use of Table,Main Relationship

IC_USERS,"Stores candidate/user profile, device identity, resume-extracted details, total experience, and relevant experience","One user has many conversations, interviews, job descriptions, education records, experience records, projects, certificates, social links, skills, prompts, and user LLMs"

IC_SKILLS,"Stores global master list of all skills such as React, Java, Appian, SQL, AWS",One skill can be linked to many entities through IC_REF_SKILLS

IC_REF_SKILLS,"Stores skill mapping for different entities such as candidate/user, JD, project, or experience",One user/JD/project/experience can have many skills; one skill can be used in many mappings

IC_EDUCATION,Stores education details extracted from resume,One user has many education records

IC_EXPERIENCE,Stores work experience details extracted from resume,One user has many experience records

IC_PROJECTS,Stores project details extracted from resume,One user has many projects

IC_CERTIFICATES,Stores certifications extracted from resume,One user has many certificates

IC_SOCIAL_LINKS,"Stores LinkedIn, GitHub, portfolio, LeetCode, HackerRank, and other profile links",One user has many social links

IC_JOB_DESCRIPTION,"Stores JD/company/role details, job requirements, responsibilities, must-have skills text, nice-to-have skills text, and final candidate-to-JD score",One user has many job descriptions; one JD can have many conversations and interview sessions

IC_CONVERSATIONS,"Stores AI chat thread/history for resume analysis, JD review, interview, post-interview review, or normal chat",One user has many conversations; one JD/interview can have many conversations

IC_MESSAGES,Stores individual user/assistant/system messages inside a conversation,One conversation has many messages

IC_DOCUMENTS,Stores screenshot/image/audio/file attachment metadata linked to messages; actual files are stored in Supabase/cloud,One message can have many attachments

IC_USER_PROMPTS,Stores default/custom prompts used by AI model,One user can have many prompts; one prompt can be used in many conversations

IC_USER_LLM,"Stores LLMs accessible/configured for a user, including API key reference and default model access",One user can have many user LLM configurations

IC_REF_LLM,Stores master list of all LLM models available in the system,One master LLM can be assigned to many users through IC_USER_LLM

IC_SPEECH_TO_TEXT,"Stores speech-to-text transcript history from microphone, system audio, or uploaded audio",One conversation can have many STT records; one interview session can have many STT records

IC_INTERVIEW_SESSION,"Stores interview history/planned interviews such as mock interview, live interview, technical round, HR round, etc.",One user has many interview sessions; one JD can have many interview sessions



=== SHEET: IC_USERS ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

NAME,VARCHAR(150),-,-

EMAIL,VARCHAR(255),Unique,-

PHONE,VARCHAR(30),-,-

TITLE,VARCHAR(150),-,-

TOTAL_EXP,"DECIMAL(4,1)",-,-

RELEVANT_EXP,"DECIMAL(4,1)",-,-

PROFILE_SUMMARY,TEXT,-,-

LOCATION,VARCHAR(150),-,-

SOURCE_RESUME_URL,TEXT,Cloud file URL / Supabase Storage path,-

RESUME_PARSED_AT,TIMESTAMP,-,-

PROFILE_VERSION,INTEGER,Used for reset/version tracking,-

IS_ACTIVE,BOOLEAN,-,-

CREATED_AT,TIMESTAMP,-,-



=== SHEET: IC_CONVERSATION ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

USER_ID,UUID,Many-to-One with users,users.id

JOB_DESCRIPTION_ID,UUID,"Many-to-One with job_description, nullable",job_description.id

INTERVIEW_SESSION_ID,UUID,"Many-to-One with interview_session, nullable",interview_session.id

TITLE,VARCHAR(255),-,-

CONVERSATION_TYPE,VARCHAR(50),-,-

SELECTED_USER_LLM_ID,UUID,Many-to-One with user_llm,user_llm.id

SELECTED_REF_LLM_ID,UUID,Many-to-One with ref_llm,ref_llm.id

SYSTEM_PROMPT_ID,UUID,Many-to-One with system_prompts,system_prompts.id

STATUS,VARCHAR(50),-,-

IS_ACTIVE,BOOLEAN,-,-

STARTED_AT,TIMESTAMP,-,-

ENDED_AT,TIMESTAMP,-,-

CREATED_AT,TIMESTAMP,-,-

UPDATED_AT,TIMESTAMP,-,-



=== SHEET: IC_SKILLS ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

SKILL_NAME,VARCHAR(150),Unique,-

CATEGORY,VARCHAR(100),-,-

DESCRIPTION,TEXT,-,-

IS_ACTIVE,BOOLEAN,-,-

CREATED_AT,TIMESTAMP,-,-

UPDATED_AT,TIMESTAMP,-,-



=== SHEET: IC_SKILLS_MAPPING ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

SKILL_ID,UUID,Many-to-One with skills,skills.id

ENTITY_TYPE,VARCHAR(50),Polymorphic entity type,-

ENTITY_ID,UUID,Polymorphic entity ID,-

SKILL_SOURCE,VARCHAR(50),"resume, jd, manual, ai_extracted",-

SKILL_LEVEL,VARCHAR(50),"beginner, intermediate, advanced, expert",-

YEARS_EXP,"DECIMAL(4,1)",-,-

IS_REQUIRED,BOOLEAN,For JD skills,-

IS_ACTIVE,BOOLEAN,-,-

CREATED_AT,TIMESTAMP,-,-

UPDATED_AT,TIMESTAMP,-,-



=== SHEET: IC_EDUCATION ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

USER_ID,UUID,Many-to-One with users,users.id

QUALIFICATION_LEVEL,VARCHAR(150),-,-

DEGREE,VARCHAR(150),-,-

FIELD_OF_STUDY,VARCHAR(150),-,-

INSTITUTE_NAME,VARCHAR(200),-,-

UNIVERSITY_NAME,VARCHAR(200),-,-

START_YEAR,INTEGER,-,-

END_YEAR,INTEGER,-,-

GRADE_OR_PERCENTAGE,VARCHAR(50),-,-

IS_HIGHEST,BOOLEAN,-,-

SORT_ORDER,INTEGER,-,-

CREATED_AT,TIMESTAMP,-,-

UPDATED_AT,TIMESTAMP,-,-



=== SHEET: IC_EXPERIENCE ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

USER_ID,UUID,Many-to-One with users,users.id

COMPANY_NAME,VARCHAR(200),-,-

JOB_TITLE,VARCHAR(150),-,-

EMPLOYMENT_TYPE,VARCHAR(100),-,-

LOCATION,VARCHAR(150),-,-

START_DATE,DATE,-,-

END_DATE,DATE,Nullable for current job,-

IS_CURRENT,BOOLEAN,-,-

DURATION_MONTHS,INTEGER,-,-

RESPONSIBILITIES,TEXT,-,-

TECHNOLOGIES_USED,TEXT,-,-

SORT_ORDER,INTEGER,-,-

IS_ACTIVE,BOOLEAN,-,-

CREATED_AT,TIMESTAMP,-,-

UPDATED_AT,TIMESTAMP,-,-



=== SHEET: IC_PROJECTS ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

USER_ID,UUID,Many-to-One with users,users.id

TITLE,VARCHAR(200),-,-

DESCRIPTION,TEXT,-,-

TECHNOLOGIES,VARCHAR(150),-,-

DURATION,VARCHAR(150),-,-

ROLE,VARCHAR(150),-,-

PROJECT_URL,TEXT,-,-

IS_ACTIVE,BOOLEAN,-,-

SORT_ORDER,INTEGER,-,-

CREATED_AT,TIMESTAMP,-,-

UPDATED_AT,TIMESTAMP,-,-



=== SHEET: IC_CERTIFICATES ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

USER_ID,UUID,Many-to-One with users,users.id

CERTIFICATE_NAME,VARCHAR(200),-,-

ISSUER,VARCHAR(200),-,-

ISSUE_ON,DATE,-,-

EXPIRY_ON,DATE,-,-

DOES_NOT_EXPIRE,BOOLEAN,,

CREDENTIAL_ID,VARCHAR(150),-,-

CERTIFICATE_URL,TEXT,-,-

IS_ACTIVE,BOOLEAN,-,-

SORT_ORDER,INTEGER,-,-

CREATED_AT,TIMESTAMP,-,-

UPDATED_AT,TIMESTAMP,-,-



=== SHEET: IC_SOCIAL_LINKS ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

USER_ID,UUID,Many-to-One with users,users.id

LINK_TYPE,VARCHAR(100),,
must_have_text
URL,TEXT,-,-

DISPLAY_LABEL,VARCHAR(100),-,-

IS_PRIMARY,BOOLEAN,-,-

SORT_ORDER,INTEGER,-,-

IS_ACTIVE,BOOLEAN,-,-

CREATED_AT,TIMESTAMP,-,-

UPDATED_AT,TIMESTAMP,-,-



=== SHEET: IC_MESSAGES ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

CONVERSATION_ID,UUID,Many-to-One with conversations,conversations.id

ROLE,VARCHAR(30),-,-

CONTENT,TEXT,-,-

CONTENT_TYPE,VARCHAR(50),-,-

TOKEN_INPUT,INTEGER,-,-

TOKEN_OUTPUT,INTEGER,-,-

LATENCY_MS,INTEGER,-,-

LLM_RESPONSE_ID,VARCHAR(255),-,-

PARENT_MESSAGE_ID,UUID,"Self-reference, nullable",messages.id

IS_ACTIVE,BOOLEAN,-,-



=== SHEET: IC_DOCUMENTS ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

DOCUMENT_TYPE,VARCHAR(50),-,-

FILE_NAME,VARCHAR(255),-,-

FILE_URL,TEXT,Supabase Storage URL/path,-

MIME_TYPE,VARCHAR(100),-,-

FILE_SIZE,BIGINT,-,-

EXTRACTED_TEXT,TEXT,-,-

IS_ACTIVE,BOOLEAN,-,-

CREATED_AT,TIMESTAMP,-,-

UPDATED_AT,TIMESTAMP,-,-

ENTITY_TYPE,VARCHAR(100),,

ENTITY_ID,VARCHAR(100),,



=== SHEET: IC_USER_PROMPTS ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

USER_ID,UUID,"Many-to-One with users, nullable for global prompts",users.id

NAME,VARCHAR(150),-,-

DESCRIPTION,TEXT,-,-

PROMPT_TEXT,TEXT,-,-

CATEGORY,VARCHAR(100),-,-

IS_DEFAULT,BOOLEAN,-,-

IS_ACTIVE,BOOLEAN,-,-

CREATED_AT,TIMESTAMP,-,-

UPDATED_AT,TIMESTAMP,-,-



=== SHEET: IC_REF_LLM ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

PROVIDER_NAME,VARCHAR(100),-,-

MODEL_NAME,VARCHAR(150),-,-

DISPLAY_NAME,VARCHAR(150),-,-

BASE_URL,TEXT,-,-

SUPPORTS_TEXT,BOOLEAN,-,-

SUPPORTS_IMAGE,BOOLEAN,-,-

SUPPORTS_AUDIO,BOOLEAN,-,-

SUPPORTS_STREAMING,BOOLEAN,-,-

MAX_TOKENS,INTEGER,-,-

IS_ACTIVE,BOOLEAN,-,-

CREATED_AT,TIMESTAMP,-,-

UPDATED_AT,TIMESTAMP,-,-



=== SHEET: IC_USER_LLM ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

USER_ID,UUID,Many-to-One with users,users.id

REF_LLM_ID,UUID,Many-to-One with ref_llm,ref_llm.id

API_KEY_REF,TEXT,"Key reference, not raw key",-

IS_DEFAULT,BOOLEAN,-,-

IS_ACTIVE,BOOLEAN,,



=== SHEET: IC_SPEECH_TO_TEXT ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

USER_ID,UUID,Many-to-One with users,users.id

CONVERSATION_ID,UUID,Many-to-One with conversations,conversations.id

INTERVIEW_SESSION_ID,UUID,"Many-to-One with interview_session, nullable",interview_session.id

MESSAGE_ID,UUID,"Many-to-One with messages, nullable",messages.id

PROVIDER_NAME,VARCHAR(100),-,-

SOURCE_TYPE,VARCHAR(50),-,-

AUDIO_FILE_URL,TEXT,-,-

TRANSCRIPT_TEXT,TEXT,-,-

LANGUAGE,VARCHAR(50),-,-

CONFIDENCE_SCORE,"DECIMAL(5,2)",-,-

STARTED_AT,TIMESTAMP,-,-

ENDED_AT,TIMESTAMP,-,-

CREATED_AT,TIMESTAMP,-,-

IS_ACTIVE,BOOLEAN,,



=== SHEET: IC_INTERVIEW_SESSION ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

USER_ID,UUID,Many-to-One with users,users.id

JOB_DESCRIPTION_ID,UUID,"Many-to-One with job_description, nullable",job_description.id

INTERVIEW_TYPE,VARCHAR(50),-,-

TITLE,VARCHAR(255),-,-

COMPANY_NAME,VARCHAR(200),-,-

ROLE_TITLE,VARCHAR(150),-,-

INTERVIEW_MODE,VARCHAR(100),-,-

SCHEDULED_FOR,TIMESTAMP,-,-

STARTED_AT,TIMESTAMP,-,-

ENDED_AT,TIMESTAMP,-,-

STATUS,VARCHAR(50),-,-

RESULT,VARCHAR(100),-,-

NOTES,TEXT,-,-

IS_ACTIVE,BOOLEAN,-,-



=== SHEET: IC_JOB_DESCRIPTIONS ===
Column Name,DataType,Relationship,Foreign Key

ID,UUID,Primary Key,-

USER_ID,UUID,Many-to-One with USERS,users.id

TITLE,VARCHAR(200),Job role title,-

COMPANY_NAME,VARCHAR(200),Company name from JD,-

CODE,VARCHAR(50),Optional job code,-

LOCATION,VARCHAR(150),Job location,-

WORK_MODE,VARCHAR(30),onsite / remote / hybrid,-

EMPLOYMENT_TYPE,VARCHAR(30),full_time / part_time / contract / internship,-

EXP_MIN_MONTHS,INTEGER,Minimum experience required,-

EXP_MAX_MONTHS,INTEGER,Maximum experience required,-

MUST_HAVE_TEXT,TEXT,Required skills/requirements text,-

nice_to_have_text,TEXT,Optional skills/requirements text,-

JOB_SUMMARY,TEXT,JD summary,-

responsibilities_text,TEXT,Role responsibilities,-

CANDIDATE_SCORE,"NUMERIC(5,2)",Candidate-to-JD match score,-

STATUS,VARCHAR(30),draft / active / archived,-

IS_ACTIVE,BOOLEAN,Active/inactive record,-

CREATED_AT,TIMESTAMPTZ,Created timestamp,-

UPDATED_AT,TIMESTAMPTZ,Updated timestamp,-

CREATED_BY,UUID,"Many-to-One with user, nullable",users.id

UPDATED_BY,UUID,"Many-to-One with user, nullable",users.id



