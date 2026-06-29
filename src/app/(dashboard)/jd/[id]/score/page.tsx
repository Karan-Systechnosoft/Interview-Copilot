import { getJDById } from '@/services/database/jd'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { AlertTriangle, PlayCircle, FileText, ArrowLeft, ChevronDown, Star } from 'lucide-react'
import { notFound } from 'next/navigation'
import { CircularGauge } from '@/components/ui/circular-gauge'
import { ScoreMatchLayout } from '@/components/jd/ScoreMatchLayout'
import { ExpandableList } from '@/components/jd/ExpandableList'

export default async function JDScorePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const jd = await getJDById(resolvedParams.id)

  if (!jd) {
    notFound()
  }

  const overallScore = jd.candidate_score || 0
  const scoreLabel = overallScore >= 80 ? 'Strong Match' : overallScore >= 60 ? 'Moderate Match' : 'Weak Match'

  // Parse JSON data we saved from the AI analysis
  let extractedSkills: string[] = []
  let matchedSkills: { name: string, rating: number }[] = []
  let missingSkills: string[] = []
  let suggestions: string[] = []
  let mustHave: string[] = []
  let niceToHave: string[] = []
  let responsibilities: string[] = []

  try {
    if (jd.must_have_text) mustHave = JSON.parse(jd.must_have_text)
    if (jd.nice_to_have_text) niceToHave = JSON.parse(jd.nice_to_have_text)
    
    if (jd.responsibilities_text) {
      const resp = JSON.parse(jd.responsibilities_text)
      
      if (resp.matched) {
        matchedSkills = resp.matched.map((s: any) => 
          typeof s === 'string' ? { name: s, rating: 4.8 } : s
        )
      }
      if (resp.suggestions) suggestions = resp.suggestions
      if (resp.responsibilities) responsibilities = resp.responsibilities
      if (resp.missing) missingSkills = resp.missing
      if (resp.extracted) extractedSkills = resp.extracted
    }

    // Backward compatibility for old JDs
    if (!extractedSkills.length && mustHave.length > 0 && !responsibilities.length) {
       // It's an old JD. The mustHave array actually contains the extracted skills.
       extractedSkills = [...mustHave];
       // We'll also leave them in mustHave so the UI section renders!
    }
    if (!missingSkills.length && niceToHave.length > 0 && !responsibilities.length) {
       // It's an old JD. The niceToHave array actually contains the missing skills.
       missingSkills = [...niceToHave];
       // We'll also leave them in niceToHave so the UI section renders!
    }

  } catch (e) {
    console.error("Failed to parse JD analysis JSON strings", e)
  }

  // Sort matched skills by highest rating first
  matchedSkills.sort((a, b) => b.rating - a.rating)
  
  // Helper to check if a skill is matched
  const isSkillMatched = (skillName: string) => {
    return matchedSkills.some(m => m.name.toLowerCase() === skillName.toLowerCase())
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
        <div className="flex flex-col items-end gap-3 min-w-[200px]">
          <Link href={`/interview/setup?jdId=${jd.id}`} className="w-full sm:w-auto">
            <Button className="w-full gap-2"><PlayCircle className="w-4 h-4" /> Continue to Interview</Button>
          </Link>
          <div className="flex items-center gap-4 bg-white dark:bg-slate-950 p-3 px-4 rounded-xl border shadow-sm w-full sm:w-auto justify-center sm:justify-start">
            <CircularGauge score={overallScore} size={64} strokeWidth={6} />
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">AI Fit Score</p>
              <p className={`font-bold text-xl leading-none ${overallScore >= 80 ? 'text-green-500' : overallScore >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                {overallScore}%
              </p>
              <p className="text-[10px] text-muted-foreground uppercase mt-1">{scoreLabel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* JD Details Accordion */}
      <details className="group bg-card border rounded-xl shadow-sm overflow-hidden" open>
        <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-lg bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 list-none">
          Job Description Details
          <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className="p-6 space-y-8 border-t bg-white dark:bg-slate-950">
          
          {jd.job_summary && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Summary</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{jd.job_summary}</p>
            </div>
          )}

          {responsibilities.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Responsibilities</h4>
              <ExpandableList items={responsibilities} initialCount={4} />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {mustHave.length > 0 && (
              <div className="p-5 border border-green-100 dark:border-green-900/30 rounded-xl bg-white dark:bg-slate-950 shadow-sm flex flex-col">
                <h4 className="text-sm font-bold text-green-600 dark:text-green-500 mb-3 uppercase tracking-wider">Must Have</h4>
                <div className="flex flex-wrap gap-2">
                  {mustHave.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 font-medium px-3 py-1 flex items-center gap-1.5 border-0">
                      {isSkillMatched(skill) && <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />}
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {niceToHave.length > 0 && (
              <div className="p-5 border border-blue-100 dark:border-blue-900/30 rounded-xl bg-white dark:bg-slate-950 shadow-sm flex flex-col">
                <h4 className="text-sm font-bold text-blue-600 dark:text-blue-500 mb-3 uppercase tracking-wider">Nice To Have</h4>
                <div className="flex flex-wrap gap-2">
                  {niceToHave.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 font-medium px-3 py-1 flex items-center gap-1.5 border-0">
                      {isSkillMatched(skill) && <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />}
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </details>

      <ScoreMatchLayout 
        matchedSkills={matchedSkills} 
        missingSkills={missingSkills} 
        suggestions={suggestions} 
      />
    </div>
  )
}
