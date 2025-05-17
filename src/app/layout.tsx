import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import { ReactQuery } from "../../config/react-query/ReactQueryProvider";
import { I18nProvider } from "../../config/i18n/I18nProvider";

import "github-markdown-css/github-markdown-light.css";

import "./globals.css";
import { Providers } from "../../config/providers/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Echo by Takedi",
  description: "Leave your echo on the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <ReactQuery>
          <Providers>
            <I18nProvider>{children}</I18nProvider>
          </Providers>
          <Toaster />
        </ReactQuery>
      </body>
    </html>
  );
}
