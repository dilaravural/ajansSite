"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef, useState, MouseEvent } from "react";

interface RippleType {
  x: number;
  y: number;
  id: number;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  ripple?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ripple = true, children, onMouseDown, ...props }, ref) => {
    const [ripples, setRipples] = useState<RippleType[]>([]);

    const baseStyles =
      "relative overflow-hidden inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[#800020] text-white hover:bg-[#5c0017] focus:ring-[#800020] shadow-lg hover:shadow-xl",
      secondary:
        "bg-black text-white hover:bg-gray-800 focus:ring-black shadow-lg hover:shadow-xl",
      outline:
        "border-2 border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white focus:ring-[#800020]",
      ghost:
        "text-[#800020] hover:bg-[#800020]/10 focus:ring-[#800020]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
      if (ripple) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { x, y, id: Date.now() };

        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
      }

      onMouseDown?.(e);
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onMouseDown={handleMouseDown}
        {...(props as any)}
      >
        <AnimatePresence>
          {ripples.map((rpl) => (
            <motion.span
              key={rpl.id}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute rounded-full bg-white/40 pointer-events-none"
              style={{
                left: rpl.x,
                top: rpl.y,
                width: 80,
                height: 80,
                marginLeft: -40,
                marginTop: -40,
              }}
            />
          ))}
        </AnimatePresence>
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;
