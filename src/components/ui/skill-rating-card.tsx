import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface SkillRatingCardProps {
  skillName: string;
  rating: number; // 1.0 to 5.0
}

export function SkillRatingCard({ skillName, rating }: SkillRatingCardProps) {
  // We'll render 5 stars based on rating
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center justify-between gap-3 p-3 border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow h-full">
      <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 flex-1 min-w-0 break-words leading-tight" title={skillName}>
        {skillName}
      </span>
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex text-yellow-400 shrink-0">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-current" />
          ))}
          {hasHalfStar && <StarHalf className="w-3.5 h-3.5 fill-current" />}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={`empty-${i}`} className="w-3.5 h-3.5 text-slate-200 dark:text-slate-700" />
          ))}
        </div>
        <div className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-xs border border-blue-100 shrink-0">
          {rating.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
