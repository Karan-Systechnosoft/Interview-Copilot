'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Briefcase, FileUp, CheckCircle2 } from 'lucide-react'

export default function JDUploadPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleProcess = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Description Setup</h1>
        <p className="text-muted-foreground">Provide the Job Description to tailor the AI Interview Copilot.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input Job Description</CardTitle>
          <CardDescription>Upload a file, paste the text, or enter manually.</CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
             <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 border-2 border-dashed border-green-200 bg-green-50/50 rounded-lg dark:bg-green-950/20">
               <CheckCircle2 className="w-16 h-16 text-green-500" />
               <h3 className="text-2xl font-bold">JD Processed!</h3>
               <p className="text-muted-foreground">We've extracted the requirements and scored your resume against this role.</p>
               <Button size="lg" className="mt-4" onClick={() => window.location.href = '/jd/score'}>View Score Report</Button>
             </div>
          ) : isProcessing ? (
             <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 border-2 border-dashed border-primary/20 bg-primary/5 rounded-lg">
               <Briefcase className="w-16 h-16 text-primary animate-pulse" />
               <h3 className="text-xl font-bold">Analyzing JD...</h3>
               <p className="text-muted-foreground">Extracting required skills, experience, and scoring your profile.</p>
             </div>
          ) : (
            <Tabs defaultValue="paste" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="paste">Paste Text</TabsTrigger>
                <TabsTrigger value="upload">Upload File</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>
              
              <TabsContent value="paste">
                <form onSubmit={handleProcess} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="jd-text">Job Description Content</Label>
                    <Textarea id="jd-text" placeholder="Paste the full job description here..." rows={10} required />
                  </div>
                  <Button type="submit" className="w-full">Analyze JD</Button>
                </form>
              </TabsContent>
              
              <TabsContent value="upload">
                <div className="flex flex-col items-center text-center space-y-4 p-8 border-2 border-dashed border-muted rounded-md bg-muted/20">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <FileUp className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Drag & drop JD file here</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, TXT</p>
                  </div>
                  <Button onClick={handleProcess}>Upload & Analyze</Button>
                </div>
              </TabsContent>

              <TabsContent value="manual">
                <form onSubmit={handleProcess} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Role Title</Label>
                      <Input placeholder="e.g. Senior Frontend Engineer" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input placeholder="e.g. TechCorp" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Required Experience (Years)</Label>
                      <Input type="number" placeholder="e.g. 5" />
                    </div>
                    <div className="space-y-2">
                      <Label>Work Mode</Label>
                      <Input placeholder="Remote / Hybrid / Onsite" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Key Responsibilities & Skills</Label>
                    <Textarea rows={6} placeholder="List out main requirements..." required />
                  </div>
                  <Button type="submit" className="w-full">Analyze JD</Button>
                </form>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
