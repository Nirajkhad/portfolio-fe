'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { navLinks } from '@/lib/portfolio-data';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            console.log(`🔍 Active section: ${entry.target.id}`);
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0, 0.2, 0.5], rootMargin: '-100px 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#111113]/85 backdrop-blur-md border-b border-[#2a2a2e] px-4 sm:px-6 md:px-8 lg:px-10 py-3.5 flex justify-between items-center">
      <a href="/" className="transition-transform hover:scale-105">
        <Image 
          src="/logo-navbar.svg" 
          alt="NK Logo" 
          width={48} 
          height={32}
          priority
        />
      </a>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-[22px]">
        {navLinks.map((link) => {
          const sectionId = link.href.replace('#', '');
          const isActive = activeSection === sectionId;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 font-medium ${
                isActive 
                  ? 'text-[#4ade80]' 
                  : 'text-[#d1d5db] hover:text-[#4ade80]'
              }`}
            >
              {link.label}
            </a>
          );
        })}
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
        <div className="absolute top-full left-0 right-0 bg-[#111113]/95 backdrop-blur-md border-b border-[#2a2a2e] md:hidden">
          <div className="flex flex-col py-4 px-4 gap-4">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm transition-colors duration-200 font-medium ${
                    isActive 
                      ? 'text-[#4ade80]' 
                      : 'text-[#d1d5db] hover:text-[#4ade80]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
