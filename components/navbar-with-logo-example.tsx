// OPTIONAL: Navbar with Logo Integration Example
// This shows how you could integrate the NK logo into your navbar

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { navLinks } from '@/lib/portfolio-data';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0f0f11] border-b border-[#1f1f23]/50 px-4 sm:px-6 md:px-8 lg:px-10 py-3.5 flex justify-between items-center">
      {/* Logo + Domain Name */}
      <a href="/" className="flex items-center gap-2 group">
        <Image 
          src="/logo-navbar.svg" 
          alt="NK" 
          width={32} 
          height={24}
          className="hidden sm:block transition-transform group-hover:scale-110"
          priority
        />
        <span className="font-mono text-xs sm:text-[13px] text-[#4ade80] tracking-tight">
          niraj<span className="text-[#22d3ee]">.</span>com<span className="text-[#22d3ee]">.</span>np
        </span>
      </a>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-[22px]">
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

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col gap-1 w-6 h-5 justify-center items-center"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <span
          className={`w-5 h-[2px] bg-[#4ade80] transition-all duration-300 ${
            mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
          }`}
        />
        <span
          className={`w-5 h-[2px] bg-[#4ade80] transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`w-5 h-[2px] bg-[#4ade80] transition-all duration-300 ${
            mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''
          }`}
        />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0f0f11] border-b border-[#1f1f23]/50 md:hidden">
          <div className="flex flex-col py-4 px-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-[11px] text-[#3f3f46] hover:text-[#4ade80] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
