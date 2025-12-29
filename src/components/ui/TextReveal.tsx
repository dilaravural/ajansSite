"use client";

import { motion, Variants } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  type?: "words" | "chars" | "lines";
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  staggerChildren?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  type = "words",
  tag = "p",
  staggerChildren = 0.05,
  highlightWords = [],
  highlightClassName = "text-[#800020]",
}: TextRevealProps) {
  const Tag = tag;

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerChildren,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const splitText = () => {
    if (type === "chars") {
      return children.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ));
    }

    if (type === "lines") {
      return children.split("\n").map((line, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="block"
        >
          {line}
        </motion.span>
      ));
    }

    // Default: words
    return children.split(" ").map((word, index) => {
      const isHighlighted = highlightWords.some(hw =>
        word.toLowerCase().includes(hw.toLowerCase())
      );
      return (
        <motion.span
          key={index}
          variants={itemVariants}
          className={`inline-block mr-[0.25em] ${isHighlighted ? highlightClassName : ""}`}
        >
          {word}
        </motion.span>
      );
    });
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <Tag className={className}>
        {splitText()}
      </Tag>
    </motion.div>
  );
}
