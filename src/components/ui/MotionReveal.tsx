'use client';

import React from 'react';
import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion';

interface MotionRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
  once?: boolean;
}

export function MotionReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
  once = false, // 2-way bidirectional transitions on scroll
  ...props
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getOffset = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case 'up':
        return { y: 28, x: 0 };
      case 'down':
        return { y: -28, x: 0 };
      case 'left':
        return { x: 28, y: 0 };
      case 'right':
        return { x: -28, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.12, margin: '-30px 0px -30px 0px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier for clear floating entrance
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface SpotlightCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = '', ...props }: SpotlightCardProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-xl bg-[#0b1222]/80 shadow-xl shadow-[#020617]/80 hover:shadow-2xl hover:shadow-blue-950/40 transition-all duration-300 backdrop-blur-md ring-1 ring-blue-500/10 hover:ring-blue-400/25 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Radial Glow with Blue Tint */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.12), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
