'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CircleAlert, CheckCircle2 } from 'lucide-react'

function getErrorMessage(error: any) {
  const msg = error?.message?.toLowerCase() || ''
  if (msg.includes('rate limit')) {
    return 'Email rate limit reached. Please wait a few minutes or use Google/GitHub login.'
  }
  if (msg.includes('invalid format') || msg.includes('invalid claim')) {
    return 'Invalid email format. Please check your spelling.'
  }
  if (msg.includes('not enabled') || msg.includes('provider is not supported')) {
    return 'This login provider is not enabled in your Supabase dashboard yet.'
  }
  return error?.message || 'An unexpected error occurred. Please try again.'
}

export function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const supabase = createClient()

  const clearAlerts = () => {
    setError(null)
    setMessage(null)
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    clearAlerts()
    
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      console.error(error) // Uses standard browser console now
      setError(getErrorMessage(error))
    } else {
      window.location.href = '/dashboard'
    }
    setIsLoading(false)
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    clearAlerts()
    
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })

    if (error) {
      setError(getErrorMessage(error))
    } else {
      setMessage('Account created! Check your email for the confirmation link.')
    }
    setIsLoading(false)
  }

  const handleMagicLink = async () => {
    if (!email) {
      setError('Please enter your email address above to send a magic link.')
      return
    }
    setIsLoading(true)
    clearAlerts()
    
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })

    if (error) {
      setError(getErrorMessage(error))
    } else {
      setMessage('Magic link sent to your email. You can close this window.')
    }
    setIsLoading(false)
  }

  const handleOAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true)
    clearAlerts()
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })

    if (error) setError(getErrorMessage(error))
    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-slate-200">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl text-center font-bold tracking-tight text-slate-900">Welcome</CardTitle>
        <CardDescription className="text-center text-slate-500">Sign in to your PrepJinni account</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-6 flex items-start gap-3 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
            {/* Switched from AlertCircle to CircleAlert */}
            <CircleAlert className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}
        {message && (
          <div className="mb-6 flex items-start gap-3 p-3 text-sm text-teal-800 bg-teal-50 border border-teal-200 rounded-lg">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-teal-600 mt-0.5" />
            <p className="leading-relaxed">{message}</p>
          </div>
        )}

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-0">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-11" />
              </div>
              <Button type="submit" className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-medium" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In with Email'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-0">
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-11" minLength={6} />
                <p className="text-xs text-slate-500">Must be at least 6 characters long.</p>
              </div>
              <Button type="submit" className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-medium" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-slate-500 font-medium tracking-wider">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button type="button" variant="outline" className="h-11 text-slate-700" onClick={handleMagicLink} disabled={isLoading}>
            Send Magic Link
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" className="h-11 text-slate-700" onClick={() => handleOAuth('google')} disabled={isLoading}>
              <svg className="w-4 h-4 mr-2 text-slate-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
              Google
            </Button>
            <Button type="button" variant="outline" className="h-11 text-slate-700" onClick={() => handleOAuth('github')} disabled={isLoading}>
              <svg className="w-4 h-4 mr-2 text-slate-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}