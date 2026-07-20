import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getAppEnv } from "@/lib/env";
import { StagingBanner } from "@/components/StagingBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const isStage = getAppEnv() === "stage";

export const metadata: Metadata = {
  title: `Quality & Uptime Control Center${isStage ? " (Staging)" : ""}`,
  description: "Mock status dashboard for Frontend Smoke, Gateway API, ETL, and MCP health.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {isStage && <StagingBanner />}
        {children}
      </body>
    </html>
  );
}
