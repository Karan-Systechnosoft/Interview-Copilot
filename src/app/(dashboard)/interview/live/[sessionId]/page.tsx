'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mic, MicOff, Square, RefreshCcw, Scissors, Wand2, Activity, Play } from 'lucide-react'

export default function LiveInterviewPage({ params }: { params: { sessionId: string } }) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState<{role: 'interviewer' | 'candidate', text: string}[]>([])
  const [detectedQuestion, setDetectedQuestion] = useState<string | null>(null)
  const [hint, setHint] = useState<string | null>(null)
  const [fullAnswer, setFullAnswer] = useState<string | null>(null)
  const [isThinking, setIsThinking] = useState(false)

  // Simulation effect for STT and LLM
  useEffect(() => {
    if (isRecording) {
      const t1 = setTimeout(() => {
        setTranscript(prev => [...prev, { role: 'interviewer', text: 'Can you tell me about a time you had to optimize a slow application?' }])
      }, 3000)

      const t2 = setTimeout(() => {
        setDetectedQuestion('Tell me about a time you optimized a slow application.')
        setIsThinking(true)
      }, 4000)

      const t3 = setTimeout(() => {
        setHint('• Discuss TechCorp migration from Vue to React.\n• Focus on 40% performance improvement.\n• Mention bundle splitting and lazy loading.')
      }, 5500)

      const t4 = setTimeout(() => {
        setIsThinking(false)
        setFullAnswer(`At TechCorp, our frontend was originally built on an older version of Vue and was suffering from slow initial load times, averaging over 4 seconds. I led the migration to React and Next.js.

**Situation:** The legacy app was monolithic with a massive initial JS payload.
**Task:** My goal was to bring load times under 2 seconds to improve UX and retention.
**Action:** I implemented route-based code splitting, lazy loading for heavy chart components, and moved data fetching to the server-side using React Server Components.
**Result:** This reduced our initial bundle size by 60% and improved our Lighthouse performance score from 45 to 90, effectively improving load times by over 40%.`)
      }, 8000)

      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
    }
  }, [isRecording])

  const handleEndSession = () => {
    window.location.href = `/interview/review/${params.sessionId}`
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
        <div className="flex items-center gap-4">
          <Button 
            variant={isRecording ? 'destructive' : 'default'} 
            onClick={() => setIsRecording(!isRecording)}
            className="w-40"
          >
            {isRecording ? <><MicOff className="w-4 h-4 mr-2" /> Stop Mic</> : <><Mic className="w-4 h-4 mr-2" /> Start Mic</>}
          </Button>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              {isRecording && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isRecording ? 'bg-red-500' : 'bg-muted'}`}></span>
            </span>
            <span className="text-sm font-medium">{isRecording ? 'Live STT Active' : 'STT Inactive'}</span>
          </div>
          {isRecording && (
            <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 dark:bg-green-950/20">
              <Activity className="w-3 h-3 mr-1" /> Latency: 320ms
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
             <span className="font-semibold text-foreground">Model:</span> Gemini 1.5 Flash
          </div>
          <Button variant="outline" onClick={handleEndSession}>
            <Square className="w-4 h-4 mr-2" /> End Session
          </Button>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-12 gap-4 min-h-0">
        
        {/* Left Panel: Transcript */}
        <Card className="lg:col-span-3 flex flex-col min-h-0 overflow-hidden">
          <CardHeader className="py-3 px-4 border-b">
            <CardTitle className="text-sm">Live Transcript</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {transcript.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'interviewer' ? 'items-start' : 'items-end'}`}>
                <span className="text-xs text-muted-foreground mb-1">
                  {msg.role === 'interviewer' ? 'Interviewer' : 'You'}
                </span>
                <div className={`p-3 rounded-lg text-sm ${msg.role === 'interviewer' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isRecording && <div className="text-sm italic text-muted-foreground animate-pulse">Listening...</div>}
          </CardContent>
        </Card>

        {/* Center Panel: Copilot AI */}
        <Card className="lg:col-span-6 flex flex-col min-h-0 overflow-hidden border-primary/20">
          <CardHeader className="py-3 px-4 border-b bg-primary/5">
            <CardTitle className="text-sm flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-primary" /> AI Copilot
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
            {!detectedQuestion ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <Play className="w-12 h-12 mb-4 opacity-20" />
                <p>Waiting for question detection...</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Detected Question</h3>
                  <div className="p-4 bg-muted/50 rounded-lg text-lg font-medium border-l-4 border-primary">
                    "{detectedQuestion}"
                  </div>
                </div>

                {isThinking ? (
                  <div className="flex items-center gap-2 text-primary animate-pulse py-4">
                    <Activity className="w-5 h-5" /> Generating hints...
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold uppercase text-blue-600 dark:text-blue-400 tracking-wider">Quick Hint</h3>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Fast</Badge>
                      </div>
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-sm border border-blue-100 dark:border-blue-900 whitespace-pre-line">
                        {hint}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                         <h3 className="text-sm font-semibold uppercase text-green-600 dark:text-green-400 tracking-wider">Full Answer (STAR)</h3>
                         <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Detailed</Badge>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg text-sm border border-green-100 dark:border-green-900 whitespace-pre-line leading-relaxed">
                        {fullAnswer}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </CardContent>
          
          {/* Bottom Bar Tools */}
          <div className="p-3 border-t bg-muted/20 flex gap-2 justify-center">
             <Button variant="outline" size="sm" disabled={!fullAnswer}><RefreshCcw className="w-3 h-3 mr-2" /> Regenerate</Button>
             <Button variant="outline" size="sm" disabled={!fullAnswer}><Scissors className="w-3 h-3 mr-2" /> Shorten</Button>
             <Button variant="outline" size="sm" disabled={!fullAnswer}>Make Technical</Button>
          </div>
        </Card>

        {/* Right Panel: Context Used */}
        <Card className="lg:col-span-3 flex flex-col min-h-0 overflow-hidden">
          <CardHeader className="py-3 px-4 border-b">
            <CardTitle className="text-sm">Active Context</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="space-y-2">
               <Badge>Job Description</Badge>
               <p className="text-xs text-muted-foreground border-l-2 pl-2">Senior Frontend Engineer @ TechCorp</p>
            </div>
            <div className="space-y-2">
               <Badge variant="secondary">Resume Experience</Badge>
               <p className="text-xs text-muted-foreground border-l-2 pl-2">Senior Software Engineer at TechCorp Inc. (2020 - Present)</p>
            </div>
            <div className="space-y-2">
               <Badge variant="outline">Skills</Badge>
               <div className="flex flex-wrap gap-1 mt-1">
                 <Badge variant="secondary" className="text-[10px]">React</Badge>
                 <Badge variant="secondary" className="text-[10px]">Next.js</Badge>
                 <Badge variant="secondary" className="text-[10px]">Performance</Badge>
               </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
