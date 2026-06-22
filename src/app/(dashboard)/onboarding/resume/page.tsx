'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileUp, FileText, CheckCircle2 } from 'lucide-react'

export default function ResumeUploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleUpload = () => {
    setIsUploading(true)
    // Simulate upload and parse
    setTimeout(() => {
      setIsUploading(false)
      setIsParsing(true)
      setTimeout(() => {
        setIsParsing(false)
        setIsSuccess(true)
      }, 2000)
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resume Upload</h1>
        <p className="text-muted-foreground">Upload your resume to extract your profile and prepare for the interview.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
            <CardDescription>Supported formats: PDF, DOCX, TXT</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-md m-6 p-6 bg-muted/20">
            {isSuccess ? (
              <div className="flex flex-col items-center text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
                <h3 className="text-xl font-bold">Resume Parsed Successfully!</h3>
                <p className="text-sm text-muted-foreground">Your profile has been updated.</p>
                <Button onClick={() => window.location.href = '/profile/review'}>Review Profile</Button>
              </div>
            ) : isParsing ? (
              <div className="flex flex-col items-center text-center space-y-4">
                <FileText className="w-12 h-12 text-primary animate-pulse" />
                <h3 className="text-lg font-semibold">Parsing Resume...</h3>
                <p className="text-sm text-muted-foreground">Extracting experience, skills, and education.</p>
              </div>
            ) : isUploading ? (
              <div className="flex flex-col items-center text-center space-y-4">
                <FileUp className="w-12 h-12 text-primary animate-bounce" />
                <h3 className="text-lg font-semibold">Uploading...</h3>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <FileUp className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Drag & drop your resume here</p>
                  <p className="text-xs text-muted-foreground mt-1">or click to browse files</p>
                </div>
                <Button onClick={handleUpload}>Select File</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What will be extracted?</CardTitle>
            <CardDescription>We use AI to securely extract your profile data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Experience & Roles</h4>
              <p className="text-sm text-muted-foreground">Your work history, responsibilities, and achievements.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Technical Skills</h4>
              <p className="text-sm text-muted-foreground">Programming languages, tools, and frameworks.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Education & Certs</h4>
              <p className="text-sm text-muted-foreground">Degrees, universities, and relevant certifications.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Projects</h4>
              <p className="text-sm text-muted-foreground">Personal or professional projects and their impact.</p>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
              <strong>Privacy Note:</strong> Your resume data is only used to generate context-aware interview answers. If you upload a new resume, previous active profile records will be archived, not hard-deleted, to maintain data integrity.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
