"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

interface CursorTrailProps {
  color?: string;
  dotCount?: number;
  dotSize?: number;
  fadeDelay?: number;
}

export default function CursorTrail({
  color = "#800020",
  dotCount = 12,
  dotSize = 8,
  fadeDelay = 50,
}: CursorTrailProps) {
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastTime = 0;
    const minInterval = fadeDelay;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < minInterval) return;
      lastTime = now;

      setIsVisible(true);

      const newDot: TrailDot = {
        id: now,
        x: e.clientX,
        y: e.clientY,
      };

      setTrail((prev) => {
        const newTrail = [...prev, newDot];
        if (newTrail.length > dotCount) {
          return newTrail.slice(-dotCount);
        }
        return newTrail;
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dotCount, fadeDelay]);

  // Trail noktalarını temizle
  useEffect(() => {
    if (trail.length === 0) return;

    const cleanup = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, fadeDelay * 2);

    return () => clearTimeout(cleanup);
  }, [trail, fadeDelay]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {trail.map((dot, index) => {
          const scale = (index + 1) / trail.length;
          const opacity = scale * 0.6;

          return (
            <motion.div
              key={dot.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale, opacity }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute rounded-full"
              style={{
                left: dot.x - dotSize / 2,
                top: dot.y - dotSize / 2,
                width: dotSize,
                height: dotSize,
                backgroundColor: color,
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Ana cursor noktası */}
      {trail.length > 0 && (
        <motion.div
          className="absolute rounded-full"
          animate={{
            left: trail[trail.length - 1].x - dotSize / 2,
            top: trail[trail.length - 1].y - dotSize / 2,
          }}
          transition={{ type: "spring", stiffness: 800, damping: 25 }}
          style={{
            width: dotSize + 4,
            height: dotSize + 4,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}50`,
          }}
        />
      )}
    </div>
  );
}
