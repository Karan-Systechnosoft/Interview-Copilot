import { getUserProfile } from '@/services/database/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UploadCloud, Edit3, Briefcase, GraduationCap, FolderGit2, AlertTriangle, Award } from 'lucide-react';
import Link from 'next/link';
import { ExpandableSkills } from '@/components/profile/ExpandableSkills';
import { calculateProfileScore, identifyResumeGaps } from '@/lib/utils/profileScorer';
import { format, isValid } from 'date-fns';

export const metadata = {
  title: 'My Profile | PrepJinni',
};

const formatDisplayDate = (dateString: string | null | undefined) => {
  if (!dateString) return '';
  const parsed = new Date(dateString);
  return isValid(parsed) ? format(parsed, 'MMM yyyy') : dateString;
};

const formatDurationString = (duration: string | null | undefined) => {
  if (!duration) return '';
  return duration.replace(/\d{4}-\d{2}-\d{2}/g, (match) => {
    const parsed = new Date(match);
    return isValid(parsed) ? format(parsed, 'MMM yyyy') : match;
  });
};

export default async function ProfilePage() {
  const data = await getUserProfile();

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold">Unauthorized</h2>
        <p className="text-muted-foreground">Please log in to view your profile.</p>
      </div>
    );
  }

  const { profile, experiences, education, projects, certificates, socialLinks, skills } = data;

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <UploadCloud className="w-12 h-12 text-slate-300" />
        <h2 className="text-2xl font-bold tracking-tight">No Profile Found</h2>
        <p className="text-muted-foreground">Upload your resume to generate your profile.</p>
        <Button asChild>
          <Link href="/onboarding/resume">Upload Resume</Link>
        </Button>
      </div>
    );
  }

  const profileScore = calculateProfileScore(profile, experiences, education, skills, projects);
  const resumeGaps = identifyResumeGaps(experiences);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{profile.name || 'Candidate Profile'}</h1>
          <p className="text-muted-foreground">{profile.title || 'Software Engineer'} • {profile.location || 'Remote'}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile/edit">
              <><Edit3 className="w-4 h-4 mr-2" /> Edit Profile</>
            </Link>
          </Button>
          <Button size="sm" asChild>
             <Link href="/onboarding/resume">Update Resume</Link>
          </Button>
        </div>
      </div>

      {resumeGaps.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50 p-4 rounded-lg flex flex-col sm:flex-row gap-4 items-start shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-2 w-full">
            <h3 className="font-bold text-amber-800 dark:text-amber-500">Potential Resume Gaps Identified</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-amber-700/90 dark:text-amber-500/80 marker:text-amber-500/50">
              {resumeGaps.map((gap, i) => (
                <li key={i}>{gap}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column (Summary) */}
        <div className="md:col-span-1 space-y-6">
          <Card className="flex flex-col items-center justify-center p-6 border-slate-200">
            <CardHeader className="pb-4 items-center w-full px-0">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider">Profile Score</CardTitle>
              </div>
            </CardHeader>
            <div className="w-full h-px bg-border mb-6"></div>
            <CardContent className="flex flex-col items-center justify-center w-full pb-0 px-0">
              <div className="text-center">
                <div className="flex items-baseline justify-center font-bold text-blue-600">
                  <span className="text-5xl tracking-tighter">{profileScore.toFixed(1)}</span>
                  <span className="text-2xl text-slate-400">/10</span>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-3">Resume & Profile Quality</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600">
              <div className="space-y-2">
                {profile.email && <div><span className="font-semibold block text-slate-900">Email</span>{profile.email}</div>}
                {profile.phone && <div><span className="font-semibold block mt-2 text-slate-900">Phone</span>{profile.phone}</div>}
                {profile.total_exp > 0 && <div><span className="font-semibold block mt-2 text-slate-900">Experience</span>{Math.floor(profile.total_exp / 12)} years {profile.total_exp % 12} months</div>}
              </div>

              {socialLinks && socialLinks.length > 0 && (
                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-semibold text-slate-900">Links</h4>
                  {socialLinks.map((link: any) => (
                    <div key={link.id}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                        {link.display_label || link.link_type}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {skills && skills.length > 0 && (
            <ExpandableSkills skills={skills} />
          )}
        </div>

        {/* Right Column (Tabs) */}
        <div className="md:col-span-3">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {profile.profile_summary ? (
                       <div dangerouslySetInnerHTML={{ __html: profile.profile_summary.replace(/\n/g, '<br/>') }} />
                    ) : (
                      <p className="text-muted-foreground italic">No summary provided.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-lg font-semibold tracking-tight mt-8 mb-4">Education</h3>
              <div className="space-y-4">
                {education.length === 0 ? (
                   <p className="text-muted-foreground italic">No education listed.</p>
                ) : (
                  education.map((edu: any) => (
                    <Card key={edu.id}>
                      <CardHeader className="py-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-teal-600" /> {edu.degree} in {edu.field_of_study}
                            </CardTitle>
                            <CardDescription className="text-sm mt-1">{edu.institute_name}</CardDescription>
                          </div>
                          <Badge variant="outline">
                             {edu.start_year} - {edu.end_year}
                          </Badge>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="mt-6 space-y-4">
              {experiences.length === 0 ? (
                 <p className="text-muted-foreground">No experience listed.</p>
              ) : (
                experiences.map((exp: any) => (
                  <Card key={exp.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-teal-600" /> {exp.job_title}
                          </CardTitle>
                          <CardDescription className="text-md mt-1 font-medium">{exp.company_name}</CardDescription>
                        </div>
                        <Badge variant="secondary">
                           {formatDisplayDate(exp.start_date)} - {exp.is_current ? 'Present' : formatDisplayDate(exp.end_date)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm whitespace-pre-line text-slate-600">{exp.responsibilities}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>



            <TabsContent value="projects" className="mt-6 space-y-4">
              {projects.length === 0 ? (
                 <p className="text-muted-foreground">No projects listed.</p>
              ) : (
                projects.map((proj: any) => (
                  <Card key={proj.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <FolderGit2 className="w-4 h-4 text-teal-600" /> {proj.title}
                          </CardTitle>
                          <CardDescription className="text-md mt-1">{proj.role}</CardDescription>
                        </div>
                        {proj.duration && <Badge variant="secondary">{formatDurationString(proj.duration)}</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm text-slate-600 mb-4">{proj.description}</p>
                       {proj.technologies && (
                         <div className="flex flex-wrap gap-2">
                           {(Array.isArray(proj.technologies) ? proj.technologies : proj.technologies.split(',')).map((tech: string, i: number) => (
                              <Badge key={i} variant="outline" className="bg-slate-50">{tech.trim()}</Badge>
                           ))}
                         </div>
                       )}
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="certificates" className="mt-6 space-y-4">
              {certificates.length === 0 ? (
                 <p className="text-muted-foreground">No certificates listed.</p>
              ) : (
                certificates.map((cert: any) => (
                  <Card key={cert.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {cert.certificate_name}
                          </CardTitle>
                          <CardDescription className="text-md mt-1">{cert.issuer}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
