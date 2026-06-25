'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableListProps {
  items: string[];
  initialCount?: number;
}

export function ExpandableList({ items, initialCount = 4 }: ExpandableListProps) {
  const [expanded, setExpanded] = useState(false);

  if (!items || items.length === 0) return null;

  const visibleItems = expanded ? items : items.slice(0, initialCount);
  const hasMore = items.length > initialCount;

  return (
    <div>
      <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 dark:text-slate-400 marker:text-slate-400">
        {visibleItems.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      
      {hasMore && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-3 h-8 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <><ChevronUp className="w-3 h-3 mr-1" /> Show Less</>
          ) : (
            <><ChevronDown className="w-3 h-3 mr-1" /> Show {items.length - initialCount} More</>
          )}
        </Button>
      )}
    </div>
  );
}
