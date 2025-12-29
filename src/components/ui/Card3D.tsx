"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HTMLAttributes, forwardRef, MouseEvent } from "react";

interface Card3DProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: number;
  glare?: boolean;
}

const Card3D = forwardRef<HTMLDivElement, Card3DProps>(
  ({ className, intensity = 15, glare = true, children, ...props }, ref) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 relative",
          className
        )}
        {...(props as any)}
      >
        {children}
        {glare && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]) =>
                  `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.3) 0%, transparent 50%)`
              ),
            }}
          />
        )}
      </motion.div>
    );
  }
);

Card3D.displayName = "Card3D";

export default Card3D;
