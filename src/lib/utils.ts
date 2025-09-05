import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 *
 * @param inputs - Class names to be merged and conditionally applied
 * @returns A single string of class names after
 * merging and applying conditional logic
 *
 * Combines class names using clsx and merges them with twMerge to handle Tailwind CSS classes effectively
 * This function is useful for dynamically applying multiple class names in React components
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
