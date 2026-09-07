'use client';

import React from 'react';

export function VietnamFlag({ className = 'w-4 h-3' }: { className?: string }) {
  return (
    <svg
      className={`inline-block rounded-xs overflow-hidden shadow-xs shrink-0 ${className}`}
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="30" height="20" fill="#da251d" />
      <polygon
        fill="#ffff00"
        points="15,4 17.35,11.23 23.56,6.77 19.72,12.98 25.93,17.44 18.28,15.77 15,22 13.72,15.77 6.07,17.44 12.28,12.98 8.44,6.77 14.65,11.23"
        transform="scale(0.85) translate(2.6, -1)"
      />
    </svg>
  );
}

export function UkFlag({ className = 'w-4 h-3' }: { className?: string }) {
  return (
    <svg
      className={`inline-block rounded-xs overflow-hidden shadow-xs shrink-0 ${className}`}
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
