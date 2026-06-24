'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileUp, FileText, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ResumeUploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    // Visual feedback transition
    setTimeout(() => {
      setIsUploading(false)
      setIsParsing(true)
    }, 800)

    try {
      const response = await fetch('/api/parse/resume', {
        method: 'POST',
        body: formData,
      });
      
      const res = await response.json();
      setIsParsing(false);

      if (res.success) {
        setIsSuccess(true)
      } else {
        setError(res.error || "Failed to parse resume.")
      }
    } catch (err: any) {
      setIsParsing(false);
      setError(err.message || "Network error occurred.");
    }
  }

  const handleSelectClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Resume Upload</h1>
        <p className="text-muted-foreground">Upload your resume to extract your profile and prepare for the interview.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
            <CardDescription>Supported formats: PDF, TXT</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-teal-200 rounded-xl m-6 p-6 bg-teal-50/30">
            {error && (
              <div className="flex items-center text-red-600 mb-4 bg-red-50 px-3 py-2 rounded-md text-sm w-full">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}
            
            {isSuccess ? (
              <div className="flex flex-col items-center text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-teal-600" />
                <h3 className="text-xl font-bold text-slate-900">Resume Parsed Successfully!</h3>
                <p className="text-sm text-slate-500">Your profile has been updated.</p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => window.location.href = '/profile/review'}>Review Profile</Button>
              </div>
            ) : isParsing ? (
              <div className="flex flex-col items-center text-center space-y-4">
                <FileText className="w-12 h-12 text-teal-600 animate-pulse" />
                <h3 className="text-lg font-semibold text-slate-900">Parsing Resume...</h3>
                <p className="text-sm text-slate-500">Extracting experience, skills, and education.</p>
              </div>
            ) : isUploading ? (
              <div className="flex flex-col items-center text-center space-y-4">
                <FileUp className="w-12 h-12 text-teal-600 animate-bounce" />
                <h3 className="text-lg font-semibold text-slate-900">Uploading...</h3>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-teal-100 rounded-full">
                  <FileUp className="w-8 h-8 text-teal-700" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Drag & drop your resume here</p>
                  <p className="text-xs text-slate-500 mt-1">or click to browse files</p>
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
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>What will be extracted?</CardTitle>
            <CardDescription>We use AI to securely extract your profile data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-slate-900"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Experience & Roles</h4>
              <p className="text-sm text-slate-500">Your work history, responsibilities, and achievements.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-slate-900"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Technical Skills</h4>
              <p className="text-sm text-slate-500">Programming languages, tools, and frameworks.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-slate-900"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Education & Certs</h4>
              <p className="text-sm text-slate-500">Degrees, universities, and relevant certifications.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-slate-900"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Projects</h4>
              <p className="text-sm text-slate-500">Personal or professional projects and their impact.</p>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-md">
              <strong>Privacy Note:</strong> Your resume data is only used to generate context-aware interview answers. If you upload a new resume, previous active profile records will be archived, not hard-deleted, to maintain data integrity.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
