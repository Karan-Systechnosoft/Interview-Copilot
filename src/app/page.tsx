'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Menu, X, Play, FileText, CheckCircle2, MessageSquare, Code, Presentation, BrainCircuit, Activity, BarChart, Users, GraduationCap, Building, Mic, Briefcase } from 'lucide-react'

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-100">
      {/* 1. Header / Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Interview Copilot</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">Pricing</Link>
            <Link href="#faq" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">FAQ</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth">
              <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800 bg-transparent">Log in</Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm">Start Free</Button>
            </Link>
          </div>

          <button className="md:hidden text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg py-4 px-6 flex flex-col gap-4">
            <Link href="#features" className="text-base font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link href="#how-it-works" className="text-base font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
            <Link href="#pricing" className="text-base font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="#faq" className="text-base font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            <div className="h-px bg-slate-100 my-2" />
            <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full border-teal-200 text-teal-700">Log in</Button>
            </Link>
            <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-teal-600 text-white">Start Free</Button>
            </Link>
          </div>
        )}
      </header>

      <main>
        {/* 2. Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-slate-50 -z-10" />
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800">
                <span className="flex h-2 w-2 rounded-full bg-teal-500 mr-2 animate-pulse"></span>
                Practice Smarter. Answer Better.
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Your AI Copilot for <span className="text-teal-600">Confident</span> Interviews
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
                Prepare for your dream role with real-time AI guidance. We analyze your resume, simulate interviews, and help you structure winning answers effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-teal-600 hover:bg-teal-700 text-white shadow-md transition-transform hover:-translate-y-0.5">
                    Start Practicing Free
                  </Button>
                </Link>
                <Link href="#showcase">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-teal-200 text-teal-700 hover:bg-teal-50 transition-transform hover:-translate-y-0.5">
                    <Play className="w-5 h-5 mr-2" /> Watch Demo
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-slate-500 font-medium">
                No setup complexity. Upload your resume, add a job role, and start practicing.
              </p>
            </div>

            <div className="relative relative mx-auto w-full max-w-lg md:max-w-none">
              <div className="absolute -inset-4 bg-gradient-to-tr from-teal-100 to-cyan-50 rounded-[2rem] blur-xl opacity-70 -z-10 animate-pulse" />
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative">
                <div className="h-10 bg-slate-50 border-b flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <Mic className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Live Transcript</p>
                      <p className="text-sm font-medium text-slate-900">"Tell me about a time you optimized performance."</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs text-teal-600 font-bold uppercase tracking-wider mb-2 flex items-center gap-1"><Activity className="w-3 h-3"/> AI Quick Hint</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Discuss the TechCorp React migration.</li>
                      <li>• Focus on the 40% load time improvement.</li>
                    </ul>
                  </div>
                  <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                    <p className="text-xs text-teal-700 font-bold uppercase tracking-wider mb-2 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Suggested STAR Answer</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      "At TechCorp, our frontend was suffering from slow initial load times... I led the migration to React, implementing route-based code splitting..."
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -right-6 -bottom-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-green-100 p-2 rounded-lg">
                  <BarChart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">92%</p>
                  <p className="text-xs text-slate-500 font-medium">Answer Clarity</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Social Proof / Trust Section */}
        <section className="py-12 border-y border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
              Built for job seekers, students, professionals, and career coaches.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-slate-700 font-medium"><GraduationCap className="w-5 h-5"/> Students</div>
              <div className="flex items-center gap-2 text-slate-700 font-medium"><Briefcase className="w-5 h-5"/> Job Seekers</div>
              <div className="flex items-center gap-2 text-slate-700 font-medium"><Code className="w-5 h-5"/> Developers</div>
              <div className="flex items-center gap-2 text-slate-700 font-medium"><Presentation className="w-5 h-5"/> Career Coaches</div>
              <div className="flex items-center gap-2 text-slate-700 font-medium"><Building className="w-5 h-5"/> Universities</div>
            </div>
          </div>
        </section>

        {/* 3. Problem Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Why interviews feel harder than they should</h2>
              <p className="text-lg text-slate-600">Candidates often struggle with structuring their thoughts, combating nervousness, and tailoring answers to specific roles.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Unstructured Answers</h3>
                <p className="text-slate-600 text-sm">Rambling or forgetting key details under pressure during crucial questions.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Interview Anxiety</h3>
                <p className="text-slate-600 text-sm">Nerves getting the best of you, causing you to blank out on your own experience.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Weak Role Prep</h3>
                <p className="text-slate-600 text-sm">Failing to align your past projects with the specific requirements of the job description.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                  <BarChart className="w-6 h-6 text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Feedback Loop</h3>
                <p className="text-slate-600 text-sm">Practicing in a mirror doesn't tell you if your answers are actually good.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Value Proposition Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">One platform to prepare, practice, and improve</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-16">
              An intelligent interview preparation assistant that brings resume analysis, mock interviews, AI coaching, and progress tracking into one simple workflow.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-teal-50/30 transition-colors">
                <div className="w-16 h-16 mx-auto bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                  <BrainCircuit className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Personalized</h3>
                <p className="text-slate-600">Copilot reads your resume and the target job description to tailor every question and suggested answer specifically to you.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-teal-50/30 transition-colors">
                <div className="w-16 h-16 mx-auto bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                  <Activity className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time</h3>
                <p className="text-slate-600">Get live hints and structured STAR method answers generated instantly as you listen to the interviewer's question.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-teal-50/30 transition-colors">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Play className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Practice-first</h3>
                <p className="text-slate-600">Run unlimited mock interviews in a low-pressure environment before you step into the real high-stakes meeting.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Product Showcase Section */}
        <section id="showcase" className="py-24 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Your intelligent dashboard for interview mastery</h2>
              <p className="text-lg text-slate-600">
                Experience a clean, distraction-free environment designed to help you focus entirely on your delivery while the AI handles the structuring.
              </p>
              
              <ul className="space-y-4">
                {[
                  'Upload your resume to extract your history.',
                  'Add a job description for targeted prep.',
                  'Choose between HR, Technical, or System Design modes.',
                  'Practice with AI-generated mock sessions.',
                  'Review transcripts and actionable feedback.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="mt-4 bg-white text-teal-700 border border-teal-200 hover:bg-teal-50">
                Explore the Dashboard
              </Button>
            </div>
            
            <div className="relative mx-auto w-full max-w-xl">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                 <div className="bg-slate-100 p-4 border-b border-slate-200 flex justify-between items-center">
                    <div className="font-semibold text-sm text-slate-700">Interview Setup</div>
                    <div className="flex gap-2">
                      <div className="w-20 h-6 bg-slate-200 rounded-md"></div>
                      <div className="w-16 h-6 bg-teal-600 rounded-md"></div>
                    </div>
                 </div>
                 <div className="p-6 space-y-4">
                    <div className="flex gap-4">
                      <div className="w-1/3 h-24 bg-slate-100 rounded-lg border border-dashed border-slate-300"></div>
                      <div className="w-2/3 h-24 bg-teal-50 rounded-lg border border-teal-100"></div>
                    </div>
                    <div className="w-full h-8 bg-slate-100 rounded-md"></div>
                    <div className="w-3/4 h-8 bg-slate-100 rounded-md"></div>
                    <div className="flex gap-4 mt-8">
                       <div className="flex-1 h-32 bg-white shadow-sm border border-slate-100 rounded-xl p-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full mb-2"></div>
                          <div className="w-full h-4 bg-slate-100 rounded mb-2"></div>
                          <div className="w-2/3 h-4 bg-slate-100 rounded"></div>
                       </div>
                       <div className="flex-1 h-32 bg-white shadow-sm border border-slate-100 rounded-xl p-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full mb-2"></div>
                          <div className="w-full h-4 bg-slate-100 rounded mb-2"></div>
                          <div className="w-1/2 h-4 bg-slate-100 rounded"></div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Core Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Everything you need before the interview</h2>
               <p className="text-lg text-slate-600 mt-4">Powerful AI tools engineered to give you the competitive edge in today's tech market.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: FileText, title: 'Resume-aware Answers', desc: 'Every suggested answer naturally weaves in your actual career experience.' },
                { icon: Briefcase, title: 'JD Analysis', desc: 'Automatically maps your skills against the specific job posting requirements.' },
                { icon: Play, title: 'Mock Practices', desc: 'Simulate high-pressure environments with realistic conversational AI.' },
                { icon: Activity, title: 'Live Guidance', desc: 'Real-time hints and STAR structure templates while you speak.' },
                { icon: Code, title: 'Technical & Coding', desc: 'Specialized modes for System Design and technical coding discussions.' },
                { icon: BarChart, title: 'Clarity Scoring', desc: 'Get graded on your communication, relevance, and impact.' },
              ].map((feature, i) => (
                <div key={i} className="group p-6 rounded-2xl border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all bg-white">
                  <div className="w-12 h-12 bg-teal-50 group-hover:bg-teal-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <feature.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{feature.desc}</p>
                  <Link href="#" className="text-sm font-semibold text-teal-600 group-hover:text-teal-700 flex items-center">
                    Learn more <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Benefits Section */}
        <section className="py-24 bg-teal-50/50">
          <div className="max-w-7xl mx-auto px-6 text-center">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-12">Prepare smarter without feeling overwhelmed</h2>
             <div className="grid md:grid-cols-4 gap-6">
               {[
                 'Build stronger STAR answers',
                 'Reduce interview anxiety',
                 'Practice role-specific questions',
                 'Improve after every session'
               ].map((benefit, i) => (
                 <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
                    <CheckCircle2 className="w-8 h-8 text-teal-500 mb-4" />
                    <h3 className="text-lg font-bold text-slate-900">{benefit}</h3>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* 9. How It Works Section */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Start improving in three simple steps</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-100 -z-10"></div>
              
              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center shadow-inner border border-teal-100">
                    <FileText className="w-10 h-10 text-teal-600" />
                 </div>
                 <Badge variant="outline" className="bg-white text-slate-500">Step 1</Badge>
                 <h3 className="text-xl font-bold text-slate-900">Add your profile</h3>
                 <p className="text-slate-600">Upload your resume and paste your target job description to set the context.</p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center shadow-inner border border-teal-100">
                    <Mic className="w-10 h-10 text-teal-600" />
                 </div>
                 <Badge variant="outline" className="bg-white text-slate-500">Step 2</Badge>
                 <h3 className="text-xl font-bold text-slate-900">Practice with AI</h3>
                 <p className="text-slate-600">Run mock interviews, receive live hints, and learn how to deliver impactful answers.</p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center shadow-inner border border-teal-100">
                    <BarChart className="w-10 h-10 text-teal-600" />
                 </div>
                 <Badge variant="outline" className="bg-white text-slate-500">Step 3</Badge>
                 <h3 className="text-xl font-bold text-slate-900">Review and improve</h3>
                 <p className="text-slate-600">Analyze your session transcripts, review AI feedback, and refine your technique.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Pricing Section */}
        <section id="pricing" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Simple pricing for every stage of your job search</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
                <h3 className="text-xl font-bold text-slate-900">Free</h3>
                <div className="mt-4 flex items-baseline text-4xl font-extrabold text-slate-900">
                  $0<span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
                </div>
                <p className="mt-4 text-sm text-slate-600">Perfect for exploring the platform.</p>
                <ul className="mt-8 space-y-4 flex-1">
                  {['3 Mock Interviews/mo', 'Basic Resume Extraction', 'General Feedback', 'Community Support'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                      <span className="text-slate-700 text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-8 border-teal-200 text-teal-700 hover:bg-teal-50">Get Started Free</Button>
              </div>

              <div className="bg-white rounded-3xl p-8 border-2 border-teal-500 shadow-lg relative flex flex-col transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Recommended
                </div>
                <h3 className="text-xl font-bold text-slate-900">Pro</h3>
                <div className="mt-4 flex items-baseline text-4xl font-extrabold text-slate-900">
                  $19<span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
                </div>
                <p className="mt-4 text-sm text-slate-600">For serious job seekers preparing heavily.</p>
                <ul className="mt-8 space-y-4 flex-1">
                  {['Unlimited Mock Interviews', 'Resume + JD Personalization', 'Live Transcript Review', 'AI Answer Coaching', 'Session History'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                      <span className="text-slate-700 text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-8 bg-teal-600 hover:bg-teal-700 text-white shadow-md">Upgrade to Pro</Button>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
                <h3 className="text-xl font-bold text-slate-900">Premium</h3>
                <div className="mt-4 flex items-baseline text-4xl font-extrabold text-slate-900">
                  $49<span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
                </div>
                <p className="mt-4 text-sm text-slate-600">Advanced tools for technical rounds.</p>
                <ul className="mt-8 space-y-4 flex-1">
                  {['Everything in Pro', 'Real-time Live Assistance', 'Coding & System Design Modes', 'Advanced Analytics', 'Priority Support'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                      <span className="text-slate-700 text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-8 border-teal-200 text-teal-700 hover:bg-teal-50">Go Premium</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 11. FAQ Section */}
        <section id="faq" className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            </div>
            
            <Accordion className="w-full space-y-4">
              {[
                {q: "What is an AI Interview Copilot?", a: "It's an intelligent assistant that listens to interview questions, analyzes your unique resume and job description, and provides real-time guidance to help you formulate the best possible answer."},
                {q: "Can I practice with my resume and job description?", a: "Yes. Simply upload your resume and paste the job description. The AI will tailor every mock question and answer suggestion to fit your actual experience and the role's specific needs."},
                {q: "Does it support behavioral and technical interviews?", a: "Absolutely. You can select different interview modes in the dashboard. The Copilot adjusts its AI models to handle HR screening, behavioral STAR questions, and technical discussions."},
                {q: "Can I review my interview performance?", a: "Yes. After every session, you get a full transcript, detected questions, suggested answers, and a detailed breakdown of what you did well and where you can improve."},
                {q: "Is my data private?", a: "Your privacy is our priority. Resumes and transcripts are processed securely and are never used to train public AI models without your explicit consent."},
                {q: "Is there a free plan?", a: "Yes, you can start for free with limited mock interviews to experience the core functionality before upgrading."}
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-slate-50 border border-slate-100 rounded-xl px-4 data-[state=open]:bg-white data-[state=open]:shadow-sm transition-all">
                  <AccordionTrigger className="text-slate-900 font-semibold hover:no-underline py-4">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 12. Final CTA Section */}
        <section className="py-24 bg-gradient-to-br from-teal-600 to-cyan-700 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to feel prepared for your next interview?</h2>
            <p className="text-xl text-teal-50 max-w-2xl mx-auto">
              Join thousands of candidates who practice with AI and walk into their interviews with complete confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/auth">
                <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg bg-white text-teal-700 hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all">
                  Start Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-lg border-white/30 text-white hover:bg-white/10 transition-all">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 13. Footer */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="col-span-2 md:col-span-1 space-y-4">
               <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded bg-teal-600 flex items-center justify-center text-white">
                   <BrainCircuit className="w-3 h-3" />
                 </div>
                 <span className="font-bold text-slate-900">Interview Copilot</span>
               </div>
               <p className="text-sm text-slate-500">Your intelligent assistant for interview mastery and career growth.</p>
               <div className="flex gap-4 pt-2">
                 <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-50 cursor-pointer flex items-center justify-center text-slate-400 hover:text-teal-600 transition-colors">
                   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-50 cursor-pointer flex items-center justify-center text-slate-400 hover:text-teal-600 transition-colors">
                   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-50 cursor-pointer flex items-center justify-center text-slate-400 hover:text-teal-600 transition-colors">
                   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                 </div>
               </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link href="#features" className="hover:text-teal-600 transition-colors">Features</Link></li>
                <li><Link href="#showcase" className="hover:text-teal-600 transition-colors">Mock Interviews</Link></li>
                <li><Link href="#how-it-works" className="hover:text-teal-600 transition-colors">Resume Analysis</Link></li>
                <li><Link href="#showcase" className="hover:text-teal-600 transition-colors">AI Coaching</Link></li>
                <li><Link href="#pricing" className="hover:text-teal-600 transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-teal-600 transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-teal-600 transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-teal-600 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-teal-600 transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-teal-600 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-teal-600 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© 2026 Interview Copilot. All rights reserved.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
