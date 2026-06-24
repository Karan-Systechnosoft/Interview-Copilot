'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Briefcase, FileUp, CheckCircle2, AlertCircle } from 'lucide-react'

export default function JDUploadPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePasteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError(null)
    
    // @ts-ignore
    const text = e.target.elements['jd-text']?.value;
    
    if (!text) {
      setError("Please paste the JD text.");
      setIsProcessing(false);
      return;
    }

    try {
      const formData = new FormData()
      formData.append('text', text)

      const response = await fetch('/api/parse/jd', {
        method: 'POST',
        body: formData,
      });
      
      const res = await response.json();
      if (res.success) {
        (window as any)._uploadedJdId = res.data.id;
        setIsSuccess(true)
      } else {
        setError(res.error || "Failed to process JD")
      }
    } catch (err: any) {
      setError(err.message || "Network error occurred.");
    }
    setIsProcessing(false)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/parse/jd', {
        method: 'POST',
        body: formData,
      });
      
      const res = await response.json();
      
      if (res.success) {
        (window as any)._uploadedJdId = res.data.id;
        setIsSuccess(true)
      } else {
        setError(res.error || "Failed to parse JD file.")
      }
    } catch (err: any) {
      setError(err.message || "Network error occurred.");
    }
    setIsProcessing(false)
  }

  const handleSelectClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Job Description Setup</h1>
        <p className="text-muted-foreground">Provide the Job Description to tailor the PrepJinni AI.</p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Input Job Description</CardTitle>
          <CardDescription>Upload a file or paste the text.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="flex items-center text-red-600 mb-4 bg-red-50 px-3 py-2 rounded-md text-sm w-full">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
          {isSuccess ? (
             <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 border-2 border-dashed border-teal-200 bg-teal-50/50 rounded-lg dark:bg-teal-950/20">
               <CheckCircle2 className="w-16 h-16 text-teal-600" />
               <h3 className="text-2xl font-bold text-slate-900">JD Processed!</h3>
               <p className="text-slate-500">We've extracted the requirements and scored your resume against this role.</p>
               <Button size="lg" className="mt-4 bg-teal-600 hover:bg-teal-700 text-white" onClick={() => window.location.href = `/jd/${(window as any)._uploadedJdId}/score`}>View Score Report</Button>
             </div>
          ) : isProcessing ? (
             <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 border-2 border-dashed border-teal-200 bg-teal-50/30 rounded-lg">
               <Briefcase className="w-16 h-16 text-teal-600 animate-pulse" />
               <h3 className="text-xl font-bold text-slate-900">Analyzing JD...</h3>
               <p className="text-slate-500">Extracting required skills, experience, and scoring your profile.</p>
             </div>
          ) : (
            <Tabs defaultValue="paste" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="paste">Paste Text</TabsTrigger>
                <TabsTrigger value="upload">Upload File</TabsTrigger>
              </TabsList>
              
              <TabsContent value="paste">
                <form onSubmit={handlePasteSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="jd-text">Job Description Content</Label>
                    <Textarea id="jd-text" name="jd-text" placeholder="Paste the full job description here..." rows={10} required className="focus-visible:ring-teal-500" />
                  </div>
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">Analyze JD</Button>
                </form>
              </TabsContent>
              
              <TabsContent value="upload">
                <div className="flex flex-col items-center text-center space-y-4 p-12 border-2 border-dashed border-teal-200 rounded-xl bg-teal-50/30">
                  <div className="p-4 bg-teal-100 rounded-full">
                    <FileUp className="w-8 h-8 text-teal-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Drag & drop JD file here</p>
                    <p className="text-xs text-slate-500 mt-1">PDF, TXT</p>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept=".pdf,.txt" 
                    className="hidden" 
                  />
                  <Button onClick={handleSelectClick} className="bg-teal-600 hover:bg-teal-700 text-white">Select File</Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
