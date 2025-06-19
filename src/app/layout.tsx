import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
// import CompanyLogo from '@/components/layout/CompanyLogo'; // Removed
import './globals.css';

export const metadata: Metadata = {
  title: 'Frontier Economics AI policy quiz',
  description: 'Master your company AI policy with interactive quizzes and AI assistance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Oswald:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        {children}
        <Toaster />
        {/* <CompanyLogo /> */} {/* Removed */}
      </body>
    </html>
  );
}
