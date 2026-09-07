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
  duration = 0.5,
  className = '',
  once = true,
  ...props
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getOffset = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case 'up':
        return { y: 14, x: 0 };
      case 'down':
        return { y: -14, x: 0 };
      case 'left':
        return { x: 14, y: 0 };
      case 'right':
        return { x: -14, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '100px 0px 0px 0px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Crisp easeOut
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
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-xl bg-zinc-900/40 border border-zinc-800/80 transition-all duration-200 backdrop-blur-md ${className}`}
      {...props}
    >
      {/* Subtle border highlight on hover */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200 rounded-xl"
        style={{
          opacity: isHovered ? 1 : 0,
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
