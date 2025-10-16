import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cline - Full-Stack Next.js App",
  description: "Migrated Cline application with Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
