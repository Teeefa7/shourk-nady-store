import { Locale } from '@/types';

/**
 * Formats currency in AED based on locale (English vs Arabic)
 */
export function formatCurrency(amount: number, locale: Locale = 'ar'): string {
  const formattedNumber = amount.toLocaleString(locale === 'ar' ? 'ar-AE' : 'en-AE', {
    maximumFractionDigits: 0,
  });

  if (locale === 'ar') {
    return `${formattedNumber} د.إ`;
  }
  return `${formattedNumber} AED`;
}

/**
 * Formats dates nicely
 */
export function formatDate(dateString: string, locale: Locale = 'ar'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate percentage discount
 */
export function calculateDiscountPercentage(price: number, compareAtPrice?: number): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

/**
 * Generate star rating array
 */
export function getRatingStars(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
}
