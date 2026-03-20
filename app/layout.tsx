import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-tc",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Taiwan 100 Mountains",
  description:
    "Interactive map of Taiwan's 100 famous mountains with filtering and search capabilities",
};

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.variable} ${notoSansTC.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
