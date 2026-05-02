"use client";
import { useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Experience } from '@/components/experience';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { Writing } from '@/components/writing';
import { Contact } from '@/components/contact';

import { Footer } from '@/components/footer';
import { BackToTop } from '@/components/back-to-top';

export default function Home() {
  useEffect(() => {
    // Handle hash navigation after content loads
    const scrollToHash = (immediate = false) => {
      const hash = window.location.hash;
      if (hash) {
        // Wait for content to load based on whether it's immediate or initial load
        const delay = immediate ? 100 : 800;
        
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, delay);
      }
    };

    // Handle initial load
    scrollToHash(false);

    // Handle hash changes (e.g., clicking links)
    const handleHashChange = () => {
      scrollToHash(true);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />
      <div className="flex flex-col">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Writing />
        <Contact />
      </div>
      <Footer />
      <BackToTop />
    </main>
  );
}
