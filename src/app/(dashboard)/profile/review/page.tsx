import { getUserProfile } from '@/services/database/user';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default async function ProfileReviewPage() {
  const data = await getUserProfile();

  if (!data || !data.profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">No Profile Found</h2>
        <p className="text-muted-foreground">Upload your resume to generate your profile.</p>
        <Button asChild>
          <Link href="/onboarding/resume">Upload Resume</Link>
        </Button>
      </div>
    );
  }

  const { profile, experiences, education, projects, certificates } = data;

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
          <Link href="/profile">
            <Button>Save & View Profile</Button>
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
                  <Input defaultValue={profile.name || ''} />
                </div>
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input defaultValue={profile.title || ''} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue={profile.email || ''} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue={profile.phone || ''} />
                </div>
                <div className="space-y-2">
                  <Label>Total Experience (Months)</Label>
                  <Input type="number" defaultValue={profile.total_exp || 0} />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input defaultValue={profile.location || ''} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Professional Summary</Label>
                <Textarea rows={5} defaultValue={profile.profile_summary || ''} />
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t p-4">
              <Button asChild>
                <Link href="/profile">Save Changes</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              {data.skills.length === 0 ? (
                <p className="text-muted-foreground text-sm">No skills extracted.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill: string, i: number) => (
                    <div key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {skill}
                    </div>
                  ))}
                </div>
              )}
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
                {experiences.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No experience extracted.</p>
                ) : (
                  experiences.map((exp: any) => (
                    <div key={exp.id} className="border rounded-md p-4 space-y-2">
                      <div className="flex justify-between font-bold">
                        <span>{exp.job_title}</span>
                        <span>{exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{exp.company_name}</div>
                      <Textarea rows={3} className="mt-2" defaultValue={exp.responsibilities || ''} />
                    </div>
                  ))
                )}
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
              <div className="space-y-6">
                {projects.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No projects extracted.</p>
                ) : (
                  projects.map((proj: any) => (
                    <div key={proj.id} className="border rounded-md p-4 space-y-2">
                      <div className="flex justify-between font-bold">
                        <span>{proj.title}</span>
                        {proj.duration && <span>{proj.duration}</span>}
                      </div>
                      <div className="text-sm text-muted-foreground">{proj.role}</div>
                      <Textarea rows={3} className="mt-2" defaultValue={proj.description || ''} />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {education.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No education extracted.</p>
                ) : (
                  education.map((edu: any) => (
                    <div key={edu.id} className="border rounded-md p-4 space-y-2">
                      <div className="flex justify-between font-bold">
                        <span>{edu.degree} in {edu.field_of_study}</span>
                        <span>{edu.start_year} - {edu.end_year}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{edu.institute_name}</div>
                    </div>
                  ))
                )}
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
               {certificates.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No certificates extracted.</p>
               ) : (
                 certificates.map((cert: any) => (
                    <div key={cert.id} className="border rounded-md p-4 space-y-2">
                      <div className="font-bold">{cert.certificate_name}</div>
                      <div className="text-sm text-muted-foreground">{cert.issuer}</div>
                    </div>
                 ))
               )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.socialLinks.length === 0 ? (
                 <p className="text-muted-foreground text-sm">No links extracted.</p>
              ) : (
                data.socialLinks.map((link: any) => (
                  <div key={link.id} className="space-y-2">
                    <Label>{link.display_label}</Label>
                    <Input defaultValue={link.url || ''} />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
