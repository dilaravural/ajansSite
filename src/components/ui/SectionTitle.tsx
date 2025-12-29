"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import TextReveal from "./TextReveal";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  highlightWords?: string[];
}

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  className,
  highlightWords = [],
}: SectionTitleProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12", className)}>
      <TextReveal
        tag="h2"
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4"
        type="words"
        staggerChildren={0.06}
        highlightWords={highlightWords}
      >
        {title}
      </TextReveal>
      {subtitle && (
        <TextReveal
          tag="p"
          className="text-gray-600 text-lg max-w-2xl mx-auto"
          delay={0.3}
          type="words"
          staggerChildren={0.02}
        >
          {subtitle}
        </TextReveal>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={cn(
          "w-20 h-1 bg-[#800020] mt-6 rounded-full origin-left",
          centered && "mx-auto"
        )}
      />
    </div>
  );
}
