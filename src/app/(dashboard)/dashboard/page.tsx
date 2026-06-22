import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileText, Briefcase, PlayCircle } from 'lucide-react'

export const metadata = {
  title: 'Dashboard | Interview Copilot',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your Interview Copilot. Let's get you prepared.</p>
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
            <div className="text-2xl font-bold">Incomplete</div>
            <p className="text-xs text-muted-foreground">Upload your resume to get started</p>
            <Link href="/onboarding/resume">
              <Button variant="link" className="px-0 mt-2">Upload Resume</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Job Descriptions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Score your resume against a JD</p>
            <Link href="/jd/upload">
              <Button variant="link" className="px-0 mt-2">Upload JD</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Interviews</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 Sessions</div>
            <p className="text-xs text-muted-foreground">You haven't completed any sessions yet</p>
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
            <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-muted-foreground">No interview data to display.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Candidate Score Trend</CardTitle>
            <CardDescription>Your resume match score across different job descriptions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-muted-foreground">No JD scores to display.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
