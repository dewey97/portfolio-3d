'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MotionRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

export function MotionReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
  ...props
}: MotionRevealProps) {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 35, x: 0 };
      case 'down':
        return { y: -35, x: 0 };
      case 'left':
        return { x: 35, y: 0 };
      case 'right':
        return { x: -35, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Apple/Linear smooth cubic bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800/80 transition-all duration-300 backdrop-blur-md ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(550px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.12), transparent 70%)`,
        }}
      />
      {/* Border Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          border: '1px solid rgba(56, 189, 248, 0.3)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
