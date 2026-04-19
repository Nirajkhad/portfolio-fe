'use client';

import { navLinks } from '@/lib/portfolio-data';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0f0f11] border-b border-[#1f1f23]/50 px-10 py-3.5 flex justify-between items-center">
      <span className="font-mono text-[13px] text-[#4ade80] tracking-tight">
        niraj<span className="text-[#22d3ee]">.</span>com<span className="text-[#22d3ee]">.</span>np
      </span>
      <div className="flex gap-[22px]">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-mono text-[11px] text-[#3f3f46] hover:text-[#4ade80] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
