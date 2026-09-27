import React, { useState } from 'react';
import logoImg from '../assets/images/ece_matrix_logo_1790527516818.jpg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const [imgError, setImgError] = useState(false);

  const dimensions = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }[size];

  if (imgError) {
    return (
      <div
        className={`${dimensions} rounded bg-gradient-to-br from-[#0c1322] via-[#09101d] to-[#040810] border border-cyan-500/40 p-1 flex items-center justify-center shadow-[0_0_12px_rgba(0,242,254,0.3)] ${className}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00f2fe"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full drop-shadow-[0_0_6px_rgba(0,242,254,0.8)]"
        >
          {/* Microchip Silicon Substrate & Interconnect Matrix */}
          <rect x="5" y="5" width="14" height="14" rx="2" fill="#00f2fe" fillOpacity="0.12" stroke="#00f2fe" />
          <path d="M9 9h6v6H9z" fill="#00f2fe" fillOpacity="0.25" stroke="#3fddbf" strokeWidth="1.2" />
          {/* Top Pins */}
          <path d="M9 2v3M15 2v3" stroke="#00f2fe" />
          {/* Bottom Pins */}
          <path d="M9 19v3M15 19v3" stroke="#00f2fe" />
          {/* Left Pins */}
          <path d="M2 9h3M2 15h3" stroke="#00f2fe" />
          {/* Right Pins */}
          <path d="M19 9h3M19 15h3" stroke="#00f2fe" />
        </svg>
      </div>
    );
  }

  return (
    <img
      alt="ECE Matrix Logo"
      src={logoImg}
      onError={() => setImgError(true)}
      className={`${dimensions} rounded object-cover border border-cyan-500/30 shadow-[0_0_12px_rgba(0,242,254,0.25)] group-hover:border-cyan-400 group-hover:shadow-[0_0_16px_rgba(0,242,254,0.4)] transition-all ${className}`}
    />
  );
};
