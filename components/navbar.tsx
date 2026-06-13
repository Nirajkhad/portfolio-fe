'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { navLinks } from '@/lib/portfolio-data';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateActiveSection = useCallback(() => {
    const sections = document.querySelectorAll('section[id]');
    let current = 'home';

    sections.forEach((section) => {
      const el = section as HTMLElement;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 150) {
        current = el.id;
      }
    });

    setActiveSection(current);
  }, []);

  useEffect(() => {
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [updateActiveSection]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const sectionId = href.replace('#', '');
    if (sectionId === 'home') return;
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      history.replaceState(null, '', href);
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#1e1e2a]'
          : 'bg-transparent border-b border-transparent'
      } px-4 sm:px-8 lg:px-16 py-4 flex justify-between items-center`}
    >
      <a href="/" className="transition-transform hover:scale-105 active:scale-95">
        <Image
          src="/logo-navbar.svg"
          alt="NK Logo"
          width={42}
          height={28}
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
      </a>

      <div className="hidden md:flex items-center gap-0.5">
        {navLinks.map((link) => {
          const sectionId = link.href.replace('#', '');
          const isActive = activeSection === sectionId;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative font-mono text-xs tracking-wide px-3 py-1.5 rounded-md transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-[#4ade80] bg-[#4ade80]/[0.06]'
                  : 'text-[#71717a] hover:text-[#e4e4e7] hover:bg-white/[0.03]'
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>

      <button
        className="md:hidden w-11 h-11 flex flex-col gap-1 items-center justify-center relative -mr-2.5 rounded-lg hover:bg-white/[0.03] transition-colors duration-200"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <span
          className={`w-5 h-[2px] bg-[#4ade80] rounded-full transition-all duration-300 ${
            mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
          }`}
        />
        <span
          className={`w-5 h-[2px] bg-[#4ade80] rounded-full transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-0 scale-x-0' : ''
          }`}
        />
        <span
          className={`w-5 h-[2px] bg-[#4ade80] rounded-full transition-all duration-300 ${
            mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
          }`}
        />
      </button>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#1e1e2a] md:hidden animate-fade-in">
          <div className="flex flex-col py-2 px-4 gap-0.5">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className={`font-mono text-sm px-3 py-3.5 rounded-md transition-all duration-200 active:scale-[0.98] ${
                    isActive
                      ? 'text-[#4ade80] bg-[#4ade80]/[0.06]'
                      : 'text-[#71717a] hover:text-[#e4e4e7]'
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
