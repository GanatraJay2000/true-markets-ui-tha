import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { WSProvider } from "@/context/WS";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "True Markets - Take Home Assignment",
  description:
    "A dashboard to display real-time cryptocurrency market feed for select stocks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full`}
      >
        <WSProvider>{children}</WSProvider>
      </body>
    </html>
  );
}
