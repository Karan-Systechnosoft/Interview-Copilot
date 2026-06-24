const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabase = createClient(envVars.NEXT_PUBLIC_SUPABASE_URL, envVars.SUPABASE_SERVICE_ROLE_KEY);

async function alterDB() {
  const query = `
    ALTER TABLE public.ic_job_descriptions 
    ADD COLUMN IF NOT EXISTS extracted_skills jsonb,
    ADD COLUMN IF NOT EXISTS matched_skills jsonb,
    ADD COLUMN IF NOT EXISTS missing_skills jsonb,
    ADD COLUMN IF NOT EXISTS suggestions jsonb;
  `;
  const { error } = await supabase.rpc('exec_sql', { sql: query });
  console.log("SQL Error:", error);
}

alterDB();
