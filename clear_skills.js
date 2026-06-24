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

async function clearOldSkills() {
  await supabase.from('ic_skills_mapping').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('ic_skills').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log("Cleared old database skills!");
}

clearOldSkills();
