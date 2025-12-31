import { format } from 'date-fns';

/**
 * Format a date string for API requests (YYYY-MM-DD)
 */
export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayFormatted = (): string => {
  return formatDate(new Date());
};
