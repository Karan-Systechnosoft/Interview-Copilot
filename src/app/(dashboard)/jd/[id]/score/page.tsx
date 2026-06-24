import { getJDById } from '@/services/database/jd'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { CheckCircle2, AlertTriangle, XCircle, PlayCircle, FileText, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function JDScorePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const jd = await getJDById(resolvedParams.id)

  if (!jd) {
    notFound()
  }

  const overallScore = jd.candidate_score || 0
  const scoreLabel = overallScore >= 80 ? 'Strong Match' : overallScore >= 60 ? 'Moderate Match' : 'Weak Match'
  const scoreColor = overallScore >= 80 ? 'text-green-500' : overallScore >= 60 ? 'text-yellow-500' : 'text-red-500'

  // Parse JSON data we saved from the AI analysis
  let extractedSkills: string[] = []
  let matchedSkills: string[] = []
  let missingSkills: string[] = []
  let suggestions: string[] = []

  try {
    if (jd.must_have_text) extractedSkills = JSON.parse(jd.must_have_text)
    if (jd.nice_to_have_text) missingSkills = JSON.parse(jd.nice_to_have_text)
    if (jd.responsibilities_text) {
      const resp = JSON.parse(jd.responsibilities_text)
      matchedSkills = resp.matched || []
      suggestions = resp.suggestions || []
    }
  } catch (e) {
    console.error("Failed to parse JD analysis JSON strings", e)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/jd" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Badge variant="secondary">{jd.company_name}</Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">JD Match Score Report</h1>
          <p className="text-muted-foreground">Detailed breakdown of how well your profile matches the role: <strong>{jd.title}</strong>.</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/interview/setup?jdId=${jd.id}`}>
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
               <Button variant="ghost" className="w-full">Upload New JD</Button>
             </Link>
          </CardFooter>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Match Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-lg">Matched Skills</span>
                  </div>
                  <Badge variant="secondary">{matchedSkills.length} found</Badge>
                </div>
                {matchedSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2 ml-7">
                    {matchedSkills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground ml-7">No key skills matched from your profile.</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-lg">Missing Skills</span>
                  </div>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-300">Needs Attention</Badge>
                </div>
                {missingSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2 ml-7">
                    {missingSkills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 font-mono">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground ml-7">You matched all extracted skills!</p>
                )}
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preparation Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, idx) => (
                  <div key={idx} className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-400">Action Item {idx + 1}</h4>
                      <p className="text-sm text-blue-800/80 dark:text-blue-200/70 mt-1">{suggestion}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No specific suggestions provided by AI.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
