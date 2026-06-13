'use client';

import { useState, useEffect } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{ animation: 'back-top-in 0.3s ease both' }}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-lg bg-[#10101a] border border-[#1e1e2a] text-[#52525b] hover:text-[#4ade80] hover:border-[#4ade80]/20 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer font-mono text-xs"
      aria-label="Back to top"
    >
      &#8593;
    </button>
  );
}
