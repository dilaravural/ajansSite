"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import CursorTrail from "@/components/ui/CursorTrail";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  // Sayfa değiştiğinde en üste scroll yap
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <CursorTrail color="#800020" dotCount={12} dotSize={6} fadeDelay={20} />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
