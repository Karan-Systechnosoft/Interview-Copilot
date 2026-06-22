'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

export default function InterviewSetupPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      window.location.href = '/interview/live/new-session-id'
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interview Setup</h1>
        <p className="text-muted-foreground">Configure your AI Copilot for the upcoming session.</p>
      </div>

      <form onSubmit={handleStart}>
        <Card>
          <CardHeader>
            <CardTitle>Session Configuration</CardTitle>
            <CardDescription>Select the mode, context, and AI model for this interview.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Interview Type</Label>
                <Select defaultValue="technical">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hr">HR / Behavioral</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="coding">Live Coding</SelectItem>
                    <SelectItem value="system_design">System Design</SelectItem>
                    <SelectItem value="managerial">Managerial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Interview Mode</Label>
                <Select defaultValue="live">
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
                <Select defaultValue="jd-1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select JD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jd-1">Senior Frontend Engineer @ TechCorp</SelectItem>
                    <SelectItem value="jd-2">Full Stack Developer @ StartupInc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Resume Profile</Label>
                <Select defaultValue="profile-1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Profile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profile-1">John Doe - v3 (Active)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>AI Model</Label>
                <Select defaultValue="fast">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fast">Gemini 1.5 Flash (Lowest Latency)</SelectItem>
                    <SelectItem value="deep">Gemini 1.5 Pro (Deep Reasoning)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Answer Style</Label>
                <Select defaultValue="star">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="star">STAR Method (Recommended)</SelectItem>
                    <SelectItem value="concise">Concise / Direct</SelectItem>
                    <SelectItem value="technical">Highly Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Session Title (Optional)</Label>
              <Input placeholder="e.g. TechCorp Final Round" />
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t p-4">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? 'Preparing Copilot...' : 'Launch Live Copilot'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
