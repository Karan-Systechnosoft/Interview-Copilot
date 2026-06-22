import { AuthForm } from '@/components/auth/AuthForm'

export const metadata = {
  title: 'Authentication | Interview Copilot',
  description: 'Login or Sign up for Interview Copilot',
}

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            Interview Copilot
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
