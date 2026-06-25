import React from 'react';

interface CircularGaugeProps {
  score: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  isCompact?: boolean;
}

export function CircularGauge({ score, size = 160, strokeWidth = 14, isCompact = false }: CircularGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Score mapped to a 0-10 scale
  const displayScore = (score / 10).toFixed(1);
  
  // Fill proportion
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  // Color determination
  let colorClass = "text-red-500";
  if (score >= 80) colorClass = "text-green-500";
  else if (score >= 60) colorClass = "text-yellow-500";
  else if (score >= 40) colorClass = "text-blue-500";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg className="absolute top-0 left-0" width={size} height={size}>
        <circle
          className="text-slate-800 dark:text-slate-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Foreground circle (progress) */}
      <svg className="absolute top-0 left-0 -rotate-90 transform" width={size} height={size}>
        <circle
          className={`${colorClass} transition-all duration-1000 ease-in-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Text in the middle */}
      <div className={`flex flex-col items-center justify-center ${isCompact ? 'space-y-0' : 'space-y-1'}`}>
        <span className={`${isCompact ? 'text-lg' : 'text-4xl'} font-extrabold text-slate-900 dark:text-slate-100`}>{displayScore}</span>
        {!isCompact && <span className="text-sm font-medium text-slate-400">/ 10</span>}
      </div>
    </div>
  );
}
