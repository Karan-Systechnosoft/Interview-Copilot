import { getUserProfile, saveFullProfile } from '@/services/database/user';
import { ProfileEditorClient } from '@/components/profile/ProfileEditorClient';
import { revalidatePath } from 'next/cache';

export const metadata = {
  title: 'Edit Profile | PrepJinni',
};

export default async function ProfileEditPage() {
  const data = await getUserProfile();

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Unauthorized</h2>
        <p className="text-muted-foreground">Please log in to edit your profile.</p>
      </div>
    );
  }

  // Server action wrapper
  async function handleSaveAction(payload: any) {
    'use server';
    await saveFullProfile(payload);
    revalidatePath('/profile');
    revalidatePath('/dashboard');
  }

  return (
    <ProfileEditorClient initialData={data} saveAction={handleSaveAction} />
  );
}
