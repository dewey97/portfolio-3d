'use client';

import React from 'react';

export function VietnamFlag({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg
      className={`inline-block rounded-[2px] overflow-hidden shrink-0 shadow-sm ${className}`}
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="30" height="20" fill="#da251d" />
      <polygon
        fill="#ffff00"
        points="15,4 16.35,8.16 20.71,8.14 17.18,10.71 18.53,15.0 15,12.44 11.47,15.0 12.82,10.71 9.29,8.14 13.65,8.16"
      />
    </svg>
  );
}

export function UkFlag({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg
      className={`inline-block rounded-[2px] overflow-hidden shrink-0 shadow-sm ${className}`}
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="uk-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="uk-diag">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-diag)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
