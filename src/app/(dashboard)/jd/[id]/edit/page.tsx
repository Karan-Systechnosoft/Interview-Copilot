import { notFound } from 'next/navigation'
import { getJDById } from '@/services/database/jd'
import { JDEditForm } from '@/components/jd/JDEditForm'

export const metadata = {
  title: 'Edit Job Description | PrepJinni',
}

export default async function JDEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const jd = await getJDById(resolvedParams.id)

  if (!jd) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Job Description</h1>
        <p className="text-muted-foreground">Review the extracted details. You can tweak responsibilities and skills before proceeding to the match report.</p>
      </div>

      <JDEditForm jd={jd} />
    </div>
  )
}
