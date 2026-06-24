'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function ExpandableSkills({ skills }: { skills: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!skills || skills.length === 0) return null;

  const INITIAL_COUNT = 15;
  const hasMore = skills.length > INITIAL_COUNT;
  const visibleSkills = isExpanded ? skills : skills.slice(0, INITIAL_COUNT);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {visibleSkills.map((skill: string, i: number) => (
            <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
              {skill}
            </Badge>
          ))}
          {!isExpanded && hasMore && (
            <Badge variant="outline" className="text-slate-500 border-dashed">
              +{skills.length - INITIAL_COUNT} more
            </Badge>
          )}
        </div>
        {hasMore && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-4 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <><ChevronUp className="w-4 h-4 mr-1" /> Show Less</>
            ) : (
              <><ChevronDown className="w-4 h-4 mr-1" /> See All Skills</>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
