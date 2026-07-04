import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Special Day for MELVINA IGBOANUGO 🎂",
  description: "Join us in celebrating Melvina Igboanugo's birthday! Leave a birthday wish, write a prayer, or browse precious memories.",
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-[0.06]"
          style={{ backgroundImage: "url('/images/mel1.png')" }}
        />
        <div className="relative z-10 flex flex-col min-h-full">{children}</div>
      </body>
    </html>
  );
}
