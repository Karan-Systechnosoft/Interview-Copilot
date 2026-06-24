import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FileText, Briefcase, PlayCircle, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'
import { getUserProfile } from '@/services/database/user'
import { getUserJDs } from '@/services/database/jd'
import { getUserSessions } from '@/services/database/interview'

export const metadata = {
  title: 'Dashboard | PrepJinni',
}

export default async function DashboardPage() {
  const [profileData, jds, sessions] = await Promise.all([
    getUserProfile(),
    getUserJDs(),
    getUserSessions()
  ]);

  const hasProfile = !!(profileData?.profile?.name || profileData?.profile?.total_exp);
  const activeJdsCount = jds?.length || 0;
  const sessionsCount = sessions?.length || 0;
  
  // Latest 3 sessions
  const recentSessions = sessions?.slice(0, 3) || [];
  
  // Latest 3 JD scores
  const recentJds = jds?.slice(0, 3) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to PrepJinni. Let's get you prepared.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/interview/setup">
            <Button className="gap-2"><PlayCircle className="w-4 h-4" /> Start Interview</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resume Profile</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {hasProfile ? <><CheckCircle2 className="w-5 h-5 text-green-500" /> Complete</> : <><AlertTriangle className="w-5 h-5 text-yellow-500" /> Incomplete</>}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {hasProfile ? 'Your resume is loaded and ready.' : 'Upload your resume to get started'}
            </p>
            <Link href={hasProfile ? "/profile" : "/onboarding/resume"}>
              <Button variant="link" className="px-0 mt-2">{hasProfile ? 'View Profile' : 'Upload Resume'}</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Job Descriptions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJdsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Score your resume against a JD</p>
            <Link href="/jd">
              <Button variant="link" className="px-0 mt-2">Manage JDs</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Interviews</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessionsCount} Sessions</div>
            <p className="text-xs text-muted-foreground mt-1">Completed mock interviews</p>
            <Link href="/interview/history">
              <Button variant="link" className="px-0 mt-2">View History</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Session History Overview</CardTitle>
            <CardDescription>A brief summary of your recent interview mock sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentSessions.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed bg-muted/20">
                <p className="text-sm text-muted-foreground">No interview data to display.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentSessions.map((session: any) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div>
                      <p className="font-medium">{session.interview_type} Interview</p>
                      <p className="text-xs text-muted-foreground">{session.ic_job_descriptions?.title || 'General Role'} • {new Date(session.started_at).toLocaleDateString()}</p>
                    </div>
                    <Link href={`/interview/review/${session.id}`}>
                      <Button variant="ghost" size="icon"><ArrowRight className="w-4 h-4" /></Button>
                    </Link>
                  </div>
                ))}
                {sessionsCount > 3 && (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/interview/history">View All Sessions</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent JD Scores</CardTitle>
            <CardDescription>Your resume match score for your latest Job Descriptions.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentJds.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed bg-muted/20">
                <p className="text-sm text-muted-foreground">No JD scores to display.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentJds.map((jd: any) => (
                  <div key={jd.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="font-medium truncate">{jd.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{jd.company_name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={jd.candidate_score >= 80 ? 'default' : jd.candidate_score >= 50 ? 'secondary' : 'destructive'} className={jd.candidate_score >= 80 ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                        {jd.candidate_score}%
                      </Badge>
                      <Link href={`/jd/${jd.id}/score`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowRight className="w-4 h-4" /></Button>
                      </Link>
                    </div>
                  </div>
                ))}
                {activeJdsCount > 3 && (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/jd">View All JDs</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
