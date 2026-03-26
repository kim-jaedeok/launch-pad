import { format, differenceInSeconds } from 'date-fns';

export function formatLaunchDate(dateStr: string): string {
  return format(new Date(dateStr), 'MMM dd, yyyy HH:mm') + ' UTC';
}

export function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export function getCountdown(targetDate: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const total = differenceInSeconds(new Date(targetDate), new Date());
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };

  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  return { days, hours, minutes, seconds, total };
}
