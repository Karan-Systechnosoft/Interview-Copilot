'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save, X, Trash2 } from 'lucide-react'

interface JDEditFormProps {
  jd: any;
}

export function JDEditForm({ jd }: JDEditFormProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const parseJsonArray = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString || '[]');
      if (Array.isArray(parsed)) return parsed;
      return [];
    } catch {
      return [];
    }
  };

  const parseResponsibilities = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString || '{}');
      if (parsed && Array.isArray(parsed.responsibilities)) return parsed.responsibilities.join('\n');
      return '';
    } catch {
      return '';
    }
  };

  const [formData, setFormData] = useState({
    title: jd.title || '',
    company_name: jd.company_name || '',
    job_summary: jd.job_summary || '',
    must_have: parseJsonArray(jd.must_have_text),
    nice_to_have: parseJsonArray(jd.nice_to_have_text),
    responsibilities: parseResponsibilities(jd.responsibilities_text)
  });

  const [newMustHave, setNewMustHave] = useState('');
  const [newNiceToHave, setNewNiceToHave] = useState('');

  const addMustHave = () => {
    if (newMustHave.trim() && !formData.must_have.includes(newMustHave.trim())) {
      setFormData(prev => ({ ...prev, must_have: [...prev.must_have, newMustHave.trim()] }));
      setNewMustHave('');
    }
  };

  const removeMustHave = (index: number) => {
    setFormData(prev => ({ ...prev, must_have: prev.must_have.filter((_: string, i: number) => i !== index) }));
  };

  const addNiceToHave = () => {
    if (newNiceToHave.trim() && !formData.nice_to_have.includes(newNiceToHave.trim())) {
      setFormData(prev => ({ ...prev, nice_to_have: [...prev.nice_to_have, newNiceToHave.trim()] }));
      setNewNiceToHave('');
    }
  };

  const removeNiceToHave = (index: number) => {
    setFormData(prev => ({ ...prev, nice_to_have: prev.nice_to_have.filter((_: string, i: number) => i !== index) }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const mustHaveArr = formData.must_have;
    const niceToHaveArr = formData.nice_to_have;
    const responsibilitiesArr = formData.responsibilities.split('\n').map(s => s.trim()).filter(Boolean);

    let respObj = {};
    try {
      respObj = JSON.parse(jd.responsibilities_text || '{}');
    } catch {}

    const payload = {
      id: jd.id,
      title: formData.title,
      company_name: formData.company_name,
      job_summary: formData.job_summary,
      must_have_text: JSON.stringify(mustHaveArr),
      nice_to_have_text: JSON.stringify(niceToHaveArr),
      responsibilities_text: JSON.stringify({
        ...respObj,
        responsibilities: responsibilitiesArr
      })
    };

    try {
      const res = await fetch('/api/jd/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.success) {
        router.push(`/jd/${jd.id}/score`);
      } else {
        setError(data.error || 'Failed to update JD');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Edit Parsed Job Description</CardTitle>
          <CardDescription>Review and adjust the extracted details before saving.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input id="company_name" name="company_name" value={formData.company_name} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job_summary">Job Summary</Label>
            <Textarea id="job_summary" name="job_summary" value={formData.job_summary} onChange={handleChange} rows={4} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Responsibilities (One per line)</Label>
            <Textarea id="responsibilities" name="responsibilities" value={formData.responsibilities} onChange={handleChange} rows={6} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label>Must Have Skills & Tags</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background cursor-text" onClick={() => document.getElementById('must-have-input')?.focus()}>
                {formData.must_have.map((skill: string, i: number) => (
                  <div key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2">
                    {skill}
                    <button type="button" onClick={() => removeMustHave(i)} className="text-primary hover:text-red-500"><X className="w-3 h-3" /></button>
                  </div>
                ))}
                <input 
                  id="must-have-input"
                  type="text" 
                  className="flex-1 outline-none min-w-[120px] bg-transparent text-sm" 
                  placeholder={formData.must_have.length === 0 ? "Type and press Enter..." : "Add another skill..."}
                  value={newMustHave} 
                  onChange={e => setNewMustHave(e.target.value)} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addMustHave();
                    } else if (e.key === 'Backspace' && newMustHave === '' && formData.must_have.length > 0) {
                      removeMustHave(formData.must_have.length - 1);
                    }
                  }}
                />
              </div>
            </div>
            <div className="space-y-4">
              <Label>Nice To Have Skills & Tags</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background cursor-text" onClick={() => document.getElementById('nice-have-input')?.focus()}>
                {formData.nice_to_have.map((skill: string, i: number) => (
                  <div key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2">
                    {skill}
                    <button type="button" onClick={() => removeNiceToHave(i)} className="text-primary hover:text-red-500"><X className="w-3 h-3" /></button>
                  </div>
                ))}
                <input 
                  id="nice-have-input"
                  type="text" 
                  className="flex-1 outline-none min-w-[120px] bg-transparent text-sm" 
                  placeholder={formData.nice_to_have.length === 0 ? "Type and press Enter..." : "Add another skill..."}
                  value={newNiceToHave} 
                  onChange={e => setNewNiceToHave(e.target.value)} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addNiceToHave();
                    } else if (e.key === 'Backspace' && newNiceToHave === '' && formData.nice_to_have.length > 0) {
                      removeNiceToHave(formData.nice_to_have.length - 1);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button type="button" variant="outline" onClick={() => router.push('/jd')}>
            <X className="w-4 h-4 mr-2" /> Cancel
          </Button>
          <Button type="submit" disabled={isSaving} className="bg-teal-600 hover:bg-teal-700 text-white">
            <Save className="w-4 h-4 mr-2" /> {isSaving ? 'Saving...' : 'Save & View Report'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
