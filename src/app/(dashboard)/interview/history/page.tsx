import { getUserSessions } from '@/services/database/interview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, PlayCircle, History } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Interview History | PrepJinni',
};

export default async function SessionHistoryPage() {
  const sessions = await getUserSessions();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interview History</h1>
          <p className="text-muted-foreground">Review transcripts and AI feedback from your past sessions.</p>
        </div>
        <Button asChild>
          <Link href="/interview/setup"><PlayCircle className="w-4 h-4 mr-2" /> New Session</Link>
        </Button>
      </div>

      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg bg-slate-50 dark:bg-slate-900">
          <History className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-xl font-bold">No Sessions Found</h3>
          <p className="text-muted-foreground max-w-sm mt-2 mb-6">You haven't completed any mock interviews yet. Start one to get personalized AI feedback.</p>
          <Button asChild>
            <Link href="/interview/setup">Start Mock Interview</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session: any) => (
            <Card key={session.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {(session.interview_type || 'Unknown').toUpperCase()} Session
                      <Badge variant={session.status === 'COMPLETED' ? 'default' : 'secondary'}>
                        {session.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      For: {session.ic_job_descriptions?.title} @ {session.ic_job_descriptions?.company_name}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    {new Date(session.started_at || session.created_at).toLocaleString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/interview/review/${session.id}`}>Review Transcript</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
