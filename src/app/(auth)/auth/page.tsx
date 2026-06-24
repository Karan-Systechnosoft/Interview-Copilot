import { AuthForm } from '@/components/auth/AuthForm'

export const metadata = {
  title: 'Authentication | PrepJinni',
  description: 'Login or Sign up for PrepJinni',
}

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            PrepJinni
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to start your real-time interview assistant.
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
