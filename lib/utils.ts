import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Encodes a JavaScript object into a URL-safe Base64 string.
 * This works universally client-side and server-side.
 */
export function encodeRoleObject(obj: { r: 'candidate' | 'employer' }) {
  const jsonString = JSON.stringify(obj);
  // Use Buffer for universal compatibility in Next.js environments
  const base64String = Buffer.from(jsonString).toString('base64');
  return encodeURIComponent(base64String);
}

/**
 * Decodes a URL parameter back into a JavaScript object.
 * This also works universally client-side and server-side.
 */
export function decodeRoleObject(
  encodedString: string
): { r: 'candidate' | 'employer' } | null {
  try {
    const decodedUri = decodeURIComponent(encodedString);
    // Use Buffer for universal compatibility
    const jsonString = Buffer.from(decodedUri, 'base64').toString('utf8');
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Failed to decode or parse role object:', e);
    return null; // Handle potential bad input
  }
}

export const formatSegmentForDisplay = (segment: string): string => {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Optional: title case
};

// generate year from 2000 to current year
const currentYear = new Date().getFullYear();
export const establishmentYears = Array.from(
  { length: currentYear - 1999 },
  (_, i) => currentYear - i
);

export function generateTimezones() {
  const timezones = new Set<string>();

  for (const timezone of Intl.supportedValuesOf('timeZone')) {
    timezones.add(timezone);
  }
  return Array.from(timezones);
}

export function generateCurrencies() {
  const currencySet = new Set<string>();

  for (const currency of Intl.supportedValuesOf('currency')) {
    currencySet.add(currency);
  }

  return Array.from(currencySet);
}
