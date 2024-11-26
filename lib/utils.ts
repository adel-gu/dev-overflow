import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime(); // Difference in milliseconds
  const diffSeconds = Math.floor(diffMs / 1000); // Difference in seconds

  if (diffSeconds < 60) {
    return `${diffSeconds} second${diffSeconds === 1 ? '' : 's'} ago`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`; // Billion
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`; // Million
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`; // Thousand
  }
  return num.toString(); // Return as is if less than 1,000
};
