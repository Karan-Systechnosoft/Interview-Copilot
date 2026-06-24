import { getUserJDs } from '@/services/database/jd';
import { SetupForm } from './setup-form';

export const metadata = {
  title: 'Setup Interview | PrepJinni',
};

export default async function InterviewSetupPage() {
  const jds = await getUserJDs();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interview Setup</h1>
        <p className="text-muted-foreground">Configure your AI Copilot for the upcoming session.</p>
      </div>

      <SetupForm jds={jds} />
    </div>
  )
}

