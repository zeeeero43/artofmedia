import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Random character generator for scramble effect
export const randomChar = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  return chars[Math.floor(Math.random() * chars.length)];
};