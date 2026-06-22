'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

export default function ProfileReviewPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidate Profile Review</h1>
          <p className="text-muted-foreground">Review and edit your parsed resume data. This context will be fed to the AI Copilot.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/onboarding/resume">
            <Button variant="outline">Re-upload Resume</Button>
          </Link>
          <Link href="/jd/upload">
            <Button>Continue to JD Upload</Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-7 mb-6 bg-muted/50 p-1">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="certs">Certs</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your contact details and professional summary.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input defaultValue="Senior Software Engineer" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label>Total Experience (Years)</Label>
                  <Input type="number" defaultValue="8" />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input defaultValue="San Francisco, CA" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Professional Summary</Label>
                <Textarea rows={5} defaultValue="Experienced Full Stack Developer with 8 years of building scalable SaaS applications using React, Node.js, and Postgres..." />
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t p-4">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Placeholders for other tabs to keep the example concise */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map(skill => (
                  <div key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {skill}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>Senior Software Engineer</span>
                    <span>2020 - Present</span>
                  </div>
                  <div className="text-sm text-muted-foreground">TechCorp Inc. • San Francisco, CA</div>
                  <Textarea rows={3} className="mt-2" defaultValue="Led the frontend team in migrating from Vue to React. Improved application performance by 40%..." />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">No projects extracted.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 space-y-2">
                <div className="flex justify-between font-bold">
                  <span>B.S. Computer Science</span>
                  <span>2012 - 2016</span>
                </div>
                <div className="text-sm text-muted-foreground">University of California, Berkeley</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certs">
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-muted-foreground text-sm">AWS Certified Solutions Architect</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>LinkedIn</Label>
                <Input defaultValue="https://linkedin.com/in/johndoe" />
              </div>
              <div className="space-y-2">
                <Label>GitHub</Label>
                <Input defaultValue="https://github.com/johndoe" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
