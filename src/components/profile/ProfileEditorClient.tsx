'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Save, Loader2, X } from 'lucide-react';

export function ProfileEditorClient({ initialData, saveAction }: { initialData: any, saveAction: (data: any) => Promise<any> }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  // State for all sections
  const [profile, setProfile] = useState(initialData.profile || {});
  const [skills, setSkills] = useState<string[]>(initialData.skills || []);
  const [experiences, setExperiences] = useState<any[]>(initialData.experiences || []);
  const [projects, setProjects] = useState<any[]>(initialData.projects || []);
  const [education, setEducation] = useState<any[]>(initialData.education || []);
  const [certificates, setCertificates] = useState<any[]>(initialData.certificates || []);
  const [socialLinks, setSocialLinks] = useState<any[]>(initialData.socialLinks || []);

  const [newSkill, setNewSkill] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        profile,
        skills,
        experiences,
        projects,
        education,
        certificates,
        socialLinks
      };
      await saveAction(payload);
      router.push('/profile');
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Failed to save profile. Please check console for details.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- Handlers for Basic Profile ---
  const handleProfileChange = (field: string, value: any) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  // --- Handlers for Skills ---
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };
  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // --- Generic Array Handlers ---
  const handleArrayChange = (setter: any, index: number, field: string, value: any) => {
    setter((prev: any[]) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };
  const handleArrayRemove = (setter: any, index: number) => {
    setter((prev: any[]) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
          <p className="text-muted-foreground">Modify your profile data below. This context is used by the AI Copilot.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/profile')} disabled={isSaving}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Profile
          </Button>
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
        
        {/* Basic Info Tab */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={profile.name || ''} onChange={e => handleProfileChange('name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input value={profile.title || ''} onChange={e => handleProfileChange('title', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={profile.email || ''} onChange={e => handleProfileChange('email', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={profile.phone || ''} onChange={e => handleProfileChange('phone', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Total Experience (Months)</Label>
                  <Input type="number" value={profile.total_exp || 0} onChange={e => handleProfileChange('total_exp', parseInt(e.target.value) || 0)} />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input value={profile.location || ''} onChange={e => handleProfileChange('location', e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Professional Summary</Label>
                <Textarea rows={5} value={profile.profile_summary || ''} onChange={e => handleProfileChange('profile_summary', e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2 p-3 border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background cursor-text" onClick={() => document.getElementById('skill-input')?.focus()}>
                {skills.map((skill, i) => (
                  <div key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2">
                    {skill}
                    <button onClick={() => removeSkill(i)} type="button" className="text-primary hover:text-red-500"><X className="w-3 h-3" /></button>
                  </div>
                ))}
                <input 
                  id="skill-input"
                  type="text" 
                  className="flex-1 outline-none min-w-[120px] bg-transparent text-sm" 
                  placeholder={skills.length === 0 ? "Type a skill and press Enter..." : "Add another skill..."}
                  value={newSkill} 
                  onChange={e => setNewSkill(e.target.value)} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    } else if (e.key === 'Backspace' && newSkill === '' && skills.length > 0) {
                      removeSkill(skills.length - 1);
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Experience Tab */}
        <TabsContent value="experience">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Work Experience</CardTitle>
              <Button size="sm" onClick={() => setExperiences([{ id: Date.now().toString(), job_title: '', company_name: '', responsibilities: '' }, ...experiences])}>
                <Plus className="w-4 h-4 mr-1" /> Add Experience
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={exp.id || i} className="border rounded-md p-4 space-y-4 relative bg-slate-50/50">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleArrayRemove(setExperiences, i)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid grid-cols-2 gap-4 pr-8">
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input value={exp.job_title || ''} onChange={e => handleArrayChange(setExperiences, i, 'job_title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input value={exp.company_name || ''} onChange={e => handleArrayChange(setExperiences, i, 'company_name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input type="date" value={exp.start_date || ''} onChange={e => handleArrayChange(setExperiences, i, 'start_date', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input type="date" value={exp.end_date || ''} onChange={e => handleArrayChange(setExperiences, i, 'end_date', e.target.value)} disabled={exp.is_current} />
                      <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" id={`current-${i}`} checked={exp.is_current || false} onChange={e => handleArrayChange(setExperiences, i, 'is_current', e.target.checked)} />
                        <label htmlFor={`current-${i}`} className="text-sm">I currently work here</label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Responsibilities</Label>
                    <Textarea rows={4} value={exp.responsibilities || ''} onChange={e => handleArrayChange(setExperiences, i, 'responsibilities', e.target.value)} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Projects</CardTitle>
              <Button size="sm" onClick={() => setProjects([{ id: Date.now().toString(), title: '', role: '', description: '', technologies: '' }, ...projects])}>
                <Plus className="w-4 h-4 mr-1" /> Add Project
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {projects.map((proj, i) => (
                <div key={proj.id || i} className="border rounded-md p-4 space-y-4 relative bg-slate-50/50">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleArrayRemove(setProjects, i)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid grid-cols-2 gap-4 pr-8">
                    <div className="space-y-2">
                      <Label>Project Title</Label>
                      <Input value={proj.title || ''} onChange={e => handleArrayChange(setProjects, i, 'title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Your Role</Label>
                      <Input value={proj.role || ''} onChange={e => handleArrayChange(setProjects, i, 'role', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration / Timeline</Label>
                      <Input value={proj.duration || ''} onChange={e => handleArrayChange(setProjects, i, 'duration', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Technologies (Comma separated)</Label>
                      <Input value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : (proj.technologies || '')} onChange={e => handleArrayChange(setProjects, i, 'technologies', e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea rows={3} value={proj.description || ''} onChange={e => handleArrayChange(setProjects, i, 'description', e.target.value)} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button size="sm" onClick={() => setEducation([{ id: Date.now().toString(), degree: '', field_of_study: '', institute_name: '' }, ...education])}>
                <Plus className="w-4 h-4 mr-1" /> Add Education
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu, i) => (
                <div key={edu.id || i} className="border rounded-md p-4 space-y-4 relative bg-slate-50/50">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleArrayRemove(setEducation, i)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid grid-cols-2 gap-4 pr-8">
                    <div className="space-y-2">
                      <Label>Degree / Qualification</Label>
                      <Input value={edu.degree || ''} onChange={e => handleArrayChange(setEducation, i, 'degree', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input value={edu.field_of_study || ''} onChange={e => handleArrayChange(setEducation, i, 'field_of_study', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input value={edu.institute_name || ''} onChange={e => handleArrayChange(setEducation, i, 'institute_name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Start Year</Label>
                        <Input type="number" value={edu.start_year || ''} onChange={e => handleArrayChange(setEducation, i, 'start_year', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>End Year</Label>
                        <Input type="number" value={edu.end_year || ''} onChange={e => handleArrayChange(setEducation, i, 'end_year', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Certifications</CardTitle>
              <Button size="sm" onClick={() => setCertificates([{ id: Date.now().toString(), certificate_name: '', issuer: '' }, ...certificates])}>
                <Plus className="w-4 h-4 mr-1" /> Add Certificate
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {certificates.map((cert, i) => (
                <div key={cert.id || i} className="flex items-center gap-4 border rounded-md p-4 bg-slate-50/50">
                  <div className="flex-1 space-y-2">
                    <Label>Certificate Name</Label>
                    <Input value={cert.certificate_name || ''} onChange={e => handleArrayChange(setCertificates, i, 'certificate_name', e.target.value)} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Issuer / Organization</Label>
                    <Input value={cert.issuer || ''} onChange={e => handleArrayChange(setCertificates, i, 'issuer', e.target.value)} />
                  </div>
                  <Button variant="ghost" size="icon" className="mt-6 text-red-500 hover:text-red-700" onClick={() => handleArrayRemove(setCertificates, i)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Links Tab */}
        <TabsContent value="links">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Social Links</CardTitle>
              <Button size="sm" onClick={() => setSocialLinks([{ id: Date.now().toString(), display_label: '', url: '' }, ...socialLinks])}>
                <Plus className="w-4 h-4 mr-1" /> Add Link
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialLinks.map((link, i) => (
                <div key={link.id || i} className="flex items-center gap-4 border rounded-md p-4 bg-slate-50/50">
                  <div className="w-1/3 space-y-2">
                    <Label>Label (e.g. LinkedIn, GitHub)</Label>
                    <Input value={link.display_label || ''} onChange={e => handleArrayChange(setSocialLinks, i, 'display_label', e.target.value)} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>URL</Label>
                    <Input value={link.url || ''} onChange={e => handleArrayChange(setSocialLinks, i, 'url', e.target.value)} />
                  </div>
                  <Button variant="ghost" size="icon" className="mt-6 text-red-500 hover:text-red-700" onClick={() => handleArrayRemove(setSocialLinks, i)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
      
      {/* Bottom Save Bar for convenience */}
      <div className="flex justify-end pt-6 pb-12">
        <Button size="lg" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Profile
        </Button>
      </div>
    </div>
  );
}
