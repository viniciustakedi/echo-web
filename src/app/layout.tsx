import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { ReactQuery } from "../../config/react-query/ReactQueryProvider";
import { I18nProvider } from "../../config/i18n/I18nProvider";

import "./globals.css";

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
          <I18nProvider>{children}</I18nProvider>
        </ReactQuery>
      </body>
    </html>
  );
}
