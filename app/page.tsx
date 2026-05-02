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
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    // Wait for content to load and settle
    const timeout = setTimeout(scrollToHash, 500);
    
    return () => clearTimeout(timeout);
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
