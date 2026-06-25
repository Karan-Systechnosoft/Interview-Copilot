import { getUserJDs } from '@/services/database/jd';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Plus, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { JDListClient } from '@/components/jd/JDListClient';

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

      <JDListClient jds={jds} />
    </div>
  );
}
