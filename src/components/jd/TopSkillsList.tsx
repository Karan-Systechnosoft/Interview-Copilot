'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SkillRatingCard } from '@/components/ui/skill-rating-card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TopSkillsListProps {
  skills: { name: string; rating: number }[];
}

export function TopSkillsList({ skills }: TopSkillsListProps) {
  const [expanded, setExpanded] = useState(false);

  if (!skills || skills.length === 0) {
    return <p className="text-sm text-muted-foreground mt-4 text-center">No key skills matched.</p>;
  }

  const visibleSkills = expanded ? skills : skills.slice(0, 5);

  return (
    <div className="w-full mt-6 space-y-3">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider text-left mb-4">Top Matching Skills</h3>
      
      <div className="flex flex-col gap-3">
        {visibleSkills.map((skill, idx) => (
          <SkillRatingCard key={idx} skillName={skill.name} rating={skill.rating} />
        ))}
      </div>

      {skills.length > 5 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <><ChevronUp className="w-4 h-4 mr-2" /> Show Less</>
          ) : (
            <><ChevronDown className="w-4 h-4 mr-2" /> Show All {skills.length} Skills</>
          )}
        </Button>
      )}
    </div>
  );
}
