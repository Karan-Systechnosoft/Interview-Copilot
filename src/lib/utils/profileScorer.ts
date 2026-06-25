import { differenceInMonths, parseISO, isValid } from 'date-fns';

export function identifyResumeGaps(experiences: any[]): string[] {
  if (!experiences || experiences.length <= 1) return [];

  // Sort experiences by start date ascending
  const sorted = [...experiences].sort((a, b) => {
    if (!a.start_date) return 1;
    if (!b.start_date) return -1;
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
  });

  const gaps: string[] = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const currentExp = sorted[i];
    const nextExp = sorted[i + 1];

    if (!currentExp.end_date || currentExp.is_current) {
      continue; // If they are currently working here, it overlaps anything after (ideally shouldn't happen if sorted by start_date, but just in case)
    }

    const currentEnd = new Date(currentExp.end_date);
    const nextStart = new Date(nextExp.start_date);

    if (isValid(currentEnd) && isValid(nextStart)) {
      const gapMonths = differenceInMonths(nextStart, currentEnd);
      if (gapMonths >= 2) { // 2 months or more is considered a gap
        gaps.push(`Experience gap of ${gapMonths} months between ${currentExp.company_name} and ${nextExp.company_name}.`);
      }
    }
  }

  // Check gap since last employment if not currently employed
  const lastExp = sorted[sorted.length - 1];
  if (lastExp && !lastExp.is_current && lastExp.end_date) {
    const lastEnd = new Date(lastExp.end_date);
    if (isValid(lastEnd)) {
      const gapToNow = differenceInMonths(new Date(), lastEnd);
      if (gapToNow >= 2) {
        gaps.push(`Experience gap of ${gapToNow} months since last employment ended.`);
      }
    }
  }

  return gaps;
}

export function calculateProfileScore(
  profile: any,
  experiences: any[],
  education: any[],
  skills: any[],
  projects: any[]
): number {
  let score = 0;

  // 1. Contact & Basic Info (up to 1.5 pts)
  if (profile?.email) score += 0.5;
  if (profile?.phone) score += 0.5;
  if (profile?.location) score += 0.5;

  // 2. Summary (up to 1.5 pts)
  if (profile?.profile_summary) {
    const words = profile.profile_summary.split(' ').length;
    if (words > 50) score += 1.5;
    else if (words > 20) score += 1.0;
    else score += 0.5;
  }

  // 3. Experience (up to 3.5 pts)
  if (experiences && experiences.length > 0) {
    score += 1.5; // Has at least some experience
    if (experiences.length >= 3) score += 1.0; // Good history length
    
    // Check if they have descriptions for their roles
    const hasDescriptions = experiences.some(e => e.responsibilities && e.responsibilities.length > 30);
    if (hasDescriptions) score += 1.0;
  }

  // 4. Education (up to 1.5 pts)
  if (education && education.length > 0) {
    score += 1.5;
  }

  // 5. Skills (up to 1.0 pts)
  if (skills && skills.length > 0) {
    if (skills.length > 10) score += 1.0;
    else score += 0.5;
  }

  // 6. Projects/Certificates (up to 1.0 pts)
  if (projects && projects.length > 0) {
    score += 1.0;
  }

  // Penalize for gaps
  const gaps = identifyResumeGaps(experiences);
  if (gaps.length > 0) {
    score -= (gaps.length * 0.5); // Minus 0.5 for each gap
  }

  // Ensure score is within bounds
  if (score < 0) score = 0;
  if (score > 10) score = 10;

  // Format to 1 decimal place safely
  return Math.round(score * 10) / 10;
}
