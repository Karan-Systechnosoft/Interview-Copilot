'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SkillRatingCard } from '@/components/ui/skill-rating-card';

interface ScoreMatchLayoutProps {
  matchedSkills: { name: string; rating: number }[];
  missingSkills: string[];
  suggestions: string[];
}

export function ScoreMatchLayout({ matchedSkills, missingSkills, suggestions }: ScoreMatchLayoutProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleSkills = expanded ? matchedSkills : matchedSkills.slice(0, 5);

  return (
    <div className="grid md:grid-cols-3 gap-6 transition-all duration-300 items-start">
      {/* Left Column: Top Skills */}
      <div className={`space-y-6 transition-all duration-300 ${expanded ? 'md:col-span-2' : 'md:col-span-1'}`}>
        <Card className="flex flex-col p-6 border-slate-200">
          <CardHeader className="pb-4 w-full px-0 pt-0 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Top Matching Skills</CardTitle>
            {matchedSkills.length > 5 && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                onClick={() => setExpanded(!expanded)}
                title={expanded ? "Show Less" : `Show All ${matchedSkills.length} Skills`}
              >
                {expanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </Button>
            )}
          </CardHeader>
          <CardContent className="w-full p-0 space-y-4">
            {matchedSkills.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center">No key skills matched.</p>
            ) : (
              <div className={`grid gap-3 ${expanded ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {visibleSkills.map((skill, idx) => (
                  <SkillRatingCard key={idx} skillName={skill.name} rating={skill.rating} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Missing Skills & Suggestions */}
      <div className={`space-y-6 transition-all duration-300 ${expanded ? 'md:col-span-1' : 'md:col-span-2'}`}>
        <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
               <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Missing Skills</CardTitle>
               <Badge variant="outline" className="text-yellow-600 border-yellow-300">Needs Attention</Badge>
             </div>
          </CardHeader>
          <CardContent>
             {missingSkills.length > 0 ? (
               <div className="flex flex-wrap gap-2">
                 {missingSkills.map((skill, idx) => (
                   <Badge key={idx} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                     {skill}
                   </Badge>
                 ))}
               </div>
             ) : (
               <p className="text-sm text-muted-foreground">You matched all extracted skills!</p>
             )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Preparation Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, idx) => (
                <div key={idx} className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-400">Action Item {idx + 1}</h4>
                    <p className="text-sm text-blue-800/80 dark:text-blue-200/70 mt-1">{suggestion}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No specific suggestions provided by AI.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
