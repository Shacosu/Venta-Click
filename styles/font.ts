import { Geist, Geist_Mono, Oswald } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});