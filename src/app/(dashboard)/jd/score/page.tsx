'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { CheckCircle2, AlertTriangle, XCircle, PlayCircle, FileText } from 'lucide-react'

export default function JDScorePage() {
  const overallScore = 78
  const scoreLabel = overallScore >= 80 ? 'Strong Match' : overallScore >= 60 ? 'Moderate Match' : 'Weak Match'
  const scoreColor = overallScore >= 80 ? 'text-green-500' : overallScore >= 60 ? 'text-yellow-500' : 'text-red-500'

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">JD Match Score Report</h1>
          <p className="text-muted-foreground">Detailed breakdown of how well your profile matches the role.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/interview/setup">
            <Button className="gap-2"><PlayCircle className="w-4 h-4" /> Continue to Interview</Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 flex flex-col items-center justify-center text-center p-6 border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle>Overall Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`text-6xl font-extrabold ${scoreColor}`}>
              {overallScore}<span className="text-3xl text-muted-foreground">/100</span>
            </div>
            <Badge variant="outline" className="text-sm px-4 py-1">{scoreLabel}</Badge>
          </CardContent>
          <CardFooter className="flex-col gap-2 pt-4 border-t w-full">
             <Link href="/onboarding/resume" className="w-full">
               <Button variant="outline" className="w-full">Re-upload Resume</Button>
             </Link>
             <Link href="/jd/upload" className="w-full">
               <Button variant="ghost" className="w-full">Edit JD</Button>
             </Link>
          </CardFooter>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Match Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Experience Match (20%)</span>
                </div>
                <Badge variant="secondary">Strong</Badge>
              </div>
              <p className="text-sm text-muted-foreground ml-7">Your 8 years of experience exceeds the required 5 years.</p>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Must-Have Skills (35%)</span>
                </div>
                <Badge variant="secondary">Good</Badge>
              </div>
              <p className="text-sm text-muted-foreground ml-7">You match 4 out of 5 required skills (React, TypeScript, Node.js, PostgreSQL).</p>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">Missing Keywords</span>
                </div>
                <Badge variant="outline" className="text-yellow-600 border-yellow-300">Needs Attention</Badge>
              </div>
              <p className="text-sm text-muted-foreground ml-7">Missing: <span className="font-mono text-xs bg-muted p-1 rounded">GraphQL</span>, <span className="font-mono text-xs bg-muted p-1 rounded">Kubernetes</span>.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preparation Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg flex items-start gap-3">
                 <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                 <div>
                   <h4 className="font-semibold text-yellow-900 dark:text-yellow-400">Review GraphQL concepts</h4>
                   <p className="text-sm text-yellow-800/80 dark:text-yellow-200/70 mt-1">Since GraphQL is a missing keyword, expect technical questions about it or be prepared to discuss how you would learn it quickly.</p>
                 </div>
               </div>
               
               <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg flex items-start gap-3">
                 <FileText className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                 <div>
                   <h4 className="font-semibold text-blue-900 dark:text-blue-400">Resume Improvement</h4>
                   <p className="text-sm text-blue-800/80 dark:text-blue-200/70 mt-1">Consider adding more details about system design and cloud infrastructure to your TechCorp Inc. experience to better align with the "Responsibilities" section of the JD.</p>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
