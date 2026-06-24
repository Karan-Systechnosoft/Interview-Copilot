import { getUserJDs } from '@/services/database/jd';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Plus, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Job Descriptions | PrepJinni',
};

export default async function JDListPage() {
  const jds = await getUserJDs();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Descriptions</h1>
          <p className="text-muted-foreground">Manage your saved roles and see how well you match.</p>
        </div>
        <Button asChild>
          <Link href="/jd/upload"><Plus className="w-4 h-4 mr-2" /> Add New JD</Link>
        </Button>
      </div>

      {jds.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg bg-slate-50 dark:bg-slate-900">
          <Briefcase className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-xl font-bold">No Job Descriptions</h3>
          <p className="text-muted-foreground max-w-sm mt-2 mb-6">You haven't added any roles yet. Upload a JD to get AI-powered insights and start practicing.</p>
          <Button asChild>
            <Link href="/jd/upload">Add Your First JD</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jds.map((jd: any) => (
            <Card key={jd.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-lg line-clamp-2">{jd.title}</CardTitle>
                    <CardDescription className="mt-1 font-medium">{jd.company_name}</CardDescription>
                  </div>
                  {jd.candidate_score && (
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg
                      ${jd.candidate_score >= 80 ? 'bg-green-100 text-green-700' : 
                        jd.candidate_score >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                      {jd.candidate_score}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-sm text-slate-500 line-clamp-3 mb-4">
                  {jd.job_summary}
                </p>
                <div className="pt-4 border-t flex justify-end gap-2 mt-auto">
                   <Button variant="ghost" size="sm" asChild>
                     <Link href={`/jd/${jd.id}/score`}>Score Report</Link>
                   </Button>
                   <Button variant="outline" size="sm" asChild>
                     <Link href={`/interview/setup?jdId=${jd.id}`}>Practice</Link>
                   </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
