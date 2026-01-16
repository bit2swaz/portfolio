import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Particles from "../components/particles";
import { Footer } from "./section/footer";
import { Navbar } from "./section/navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://bit2swaz.dev"),
  title: {
    default: "Aditya | bit2swaz",
    template: "%s | bit2swaz",
  },
  description: "Backend & Systems Engineer. Builder of distributed systems and infrastructure.",
  authors: [{ name: "Aditya" }],
  creator: "bit2swaz",
  publisher: "bit2swaz",
  category: "Technology",
  openGraph: {
    title: "Aditya | bit2swaz",
    description: "Backend & Systems Engineer. Builder of distributed systems and infrastructure.",
    url: "https://bit2swaz.dev",
    siteName: "bit2swaz",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Aditya | bit2swaz",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(
        "text-black bg-white dark:text-white dark:bg-[#111010]",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-2xl mb-10 flex flex-col md:flex-row mx-3 sm:mx-4 mt-4 sm:mt-6 md:mt-8 lg:mx-auto">
        <Analytics />
        <main className="flex-auto min-w-0 mt-4 sm:mt-6 flex flex-col px-0 sm:px-2 md:px-0">
          <Particles
            className="absolute inset-0 -z-10 animate-fade-in"
            quantity={300}
          />
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
