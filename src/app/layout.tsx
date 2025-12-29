import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enki Media | Dijital Medya Ajansı",
  description:
    "Video prodüksiyon, sosyal medya yönetimi ve dijital pazarlama alanlarında profesyonel çözümler. Markanızı dijital dünyada öne çıkarıyoruz.",
  keywords: [
    "dijital ajans",
    "video prodüksiyon",
    "sosyal medya yönetimi",
    "reklam ajansı",
    "istanbul",
    "türkiye",
  ],
  authors: [{ name: "Enki Media" }],
  openGraph: {
    title: "Enki Media | Dijital Medya Ajansı",
    description:
      "Video prodüksiyon, sosyal medya yönetimi ve dijital pazarlama alanlarında profesyonel çözümler.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
