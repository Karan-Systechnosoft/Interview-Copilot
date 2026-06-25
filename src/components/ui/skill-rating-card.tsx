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
    <div className="flex items-center justify-between p-3 border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
      <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{skillName}</span>
      <div className="flex items-center gap-3">
        <div className="flex text-yellow-400">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={`full-${i}`} className="w-4 h-4 fill-current" />
          ))}
          {hasHalfStar && <StarHalf className="w-4 h-4 fill-current" />}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={`empty-${i}`} className="w-4 h-4 text-slate-200 dark:text-slate-700" />
          ))}
        </div>
        <div className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-xs border border-blue-100">
          {rating.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
