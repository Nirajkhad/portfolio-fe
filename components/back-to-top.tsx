"use client";
import { useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      aria-label="Back to top"
      onClick={handleClick}
      className={`fixed bottom-7 right-7 z-50 p-3 rounded-full shadow-lg transition-all duration-500 bg-[#18181b]/80 border border-[#27272a] hover:bg-[#4ade80] hover:text-[#18181b] text-[#f9fafb] backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#4ade80] cursor-pointer ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto back-to-top-animate-in'
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      style={{ willChange: 'opacity, transform' }}
    >
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
