import {
  format,
  isThisMonth as isThisMonthDate,
  isToday as isTodayDate,
  startOfMonth,
  subMonths,
} from 'date-fns';

export function formatDate(dateStr: string): string {
  return format(new Date(dateStr), 'MMM d, yyyy');
}

export function formatShortDate(dateStr: string): string {
  return format(new Date(dateStr), 'MMM d');
}

export function formatMonthYear(dateStr: string): string {
  return format(new Date(dateStr), 'MMMM yyyy');
}

export function isToday(dateStr: string): boolean {
  return isTodayDate(new Date(dateStr));
}

export function isThisMonth(dateStr: string): boolean {
  return isThisMonthDate(new Date(dateStr));
}

export function startOfCurrentMonth(): string {
  return startOfMonth(new Date()).toISOString();
}

export function startOfPreviousMonth(): string {
  return startOfMonth(subMonths(new Date(), 1)).toISOString();
}

export function toISODateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
