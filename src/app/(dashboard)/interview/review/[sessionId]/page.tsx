'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, AlertTriangle, Clock, PlayCircle } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function SessionReviewPage() {
  const params = useParams<{ sessionId: string }>()
  
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interview Session Review</h1>
          <p className="text-muted-foreground">Review your performance, answers, and AI feedback.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/interview/setup">
             <Button variant="outline">Start New Session</Button>
          </Link>
          <Link href="/dashboard">
             <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Session Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
               <span className="text-muted-foreground">Duration</span>
               <span className="font-medium">45 mins</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
               <span className="text-muted-foreground">Questions Detected</span>
               <span className="font-medium">6</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
               <span className="text-muted-foreground">Average Latency</span>
               <span className="font-medium flex items-center text-green-600"><Clock className="w-3 h-3 mr-1"/> 1.2s</span>
            </div>
            <div className="flex justify-between items-center pb-2">
               <span className="text-muted-foreground">Target Role</span>
               <span className="font-medium text-right text-sm">Senior Frontend</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Performance Feedback</CardTitle>
            <CardDescription>AI-generated feedback based on your responses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg flex items-start gap-3">
               <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
               <div>
                 <h4 className="font-semibold text-green-900 dark:text-green-400">Strong System Design Answers</h4>
                 <p className="text-sm text-green-800/80 dark:text-green-200/70 mt-1">Your explanation of React migration and code splitting was excellent and heavily utilized your TechCorp experience.</p>
               </div>
             </div>
             
             <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg flex items-start gap-3">
               <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
               <div>
                 <h4 className="font-semibold text-yellow-900 dark:text-yellow-400">Behavioral Depth</h4>
                 <p className="text-sm text-yellow-800/80 dark:text-yellow-200/70 mt-1">When asked about conflict resolution, your answer lacked a clear "Result" phase in the STAR method. Consider preparing a stronger outcome for your conflict stories.</p>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Q&A Log</CardTitle>
          <CardDescription>Full transcript of detected questions and AI generated answers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-4 space-y-4">
             <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Q1</Badge>
                  <h4 className="font-medium">Can you tell me about a time you had to optimize a slow application?</h4>
                </div>
                <div className="pl-9 space-y-2">
                  <div className="p-3 bg-muted/50 rounded-md text-sm border-l-2 border-primary">
                    <strong>Generated Answer:</strong> At TechCorp, our frontend was originally built on an older version of Vue and was suffering from slow initial load times...
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>Context Used:</strong> TechCorp Resume Experience • Performance Optimization Skill
                  </div>
                </div>
             </div>
          </div>

          <div className="border rounded-lg p-4 space-y-4">
             <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Q2</Badge>
                  <h4 className="font-medium">How do you handle disagreements with a product manager?</h4>
                </div>
                <div className="pl-9 space-y-2">
                  <div className="p-3 bg-muted/50 rounded-md text-sm border-l-2 border-primary">
                    <strong>Generated Answer:</strong> I believe in data-driven discussions. During the dashboard redesign project, PM wanted to launch early...
                  </div>
                  <div className="text-xs text-muted-foreground text-yellow-600 dark:text-yellow-500">
                    <strong>Feedback:</strong> You missed explaining the final outcome. Add how the compromise impacted user adoption.
                  </div>
                </div>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
