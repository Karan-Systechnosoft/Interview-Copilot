'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { setupSessionAction } from './actions'

export function SetupForm({ jds }: { jds: any[] }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    // @ts-ignore
    const jdId = e.target.elements['jd-select']?.value || jds[0]?.id;
    // @ts-ignore
    const type = e.target.elements['type-select']?.value || 'technical';
    // @ts-ignore
    const mode = e.target.elements['mode-select']?.value || 'live';

    if (!jdId) {
      setError("Please select a Job Description.")
      setIsLoading(false)
      return;
    }

    const res = await setupSessionAction(jdId, type, mode)
    if (res.success) {
      window.location.href = `/interview/live/${res.sessionId}`
    } else {
      setError(res.error || "Failed to create session")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleStart}>
      <Card>
        <CardHeader>
          <CardTitle>Session Configuration</CardTitle>
          <CardDescription>Select the mode, context, and AI model for this interview.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && <div className="text-red-500">{error}</div>}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Interview Type</Label>
              <Select defaultValue="technical" name="type-select">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hr">HR / Behavioral</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="coding">Live Coding</SelectItem>
                  <SelectItem value="system_design">System Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Interview Mode</Label>
              <Select defaultValue="live" name="mode-select">
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Live Interview</SelectItem>
                  <SelectItem value="mock">Mock Interview (Practice)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Target Job Description</Label>
              <Select defaultValue={jds[0]?.id} name="jd-select">
                <SelectTrigger>
                  <SelectValue placeholder="Select JD" />
                </SelectTrigger>
                <SelectContent>
                  {jds.length === 0 ? (
                    <SelectItem value="" disabled>No JDs uploaded</SelectItem>
                  ) : (
                    jds.map(jd => (
                      <SelectItem key={jd.id} value={jd.id}>{jd.title} @ {jd.company_name}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>AI Model</Label>
              <Select defaultValue="llama-3.1-8b-instant" name="model-select">
                <SelectTrigger>
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llama-3.1-8b-instant">Llama 3.1 8B (Groq - Instant)</SelectItem>
                  <SelectItem value="fast">Gemini 1.5 Flash (Lowest Latency)</SelectItem>
                  <SelectItem value="deep">Gemini 1.5 Pro (Deep Reasoning)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end border-t p-4">
          <Button type="submit" size="lg" disabled={isLoading || jds.length === 0}>
            {isLoading ? 'Preparing Copilot...' : 'Launch Live Copilot'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
