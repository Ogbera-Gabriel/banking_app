import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Loading from "@/components/loading";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPleSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ["400", "700"],
  variable: "--font-ibm-ple-serif"
})

export const metadata: Metadata = {
  title: "Horizon",
  description: "Horizon is a modern banking platform for everyone",
  icons: {
    icon: "/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPleSerif.variable}`}>
        <Suspense fallback={<Loading />}>
        {children}
        </Suspense>
        <Toaster position="top-right" />
        </body>
    </html>
  );
}
