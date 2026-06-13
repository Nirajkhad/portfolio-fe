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
import { ScrollProgress } from '@/components/scroll-progress';

export default function Home() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const element = document.querySelector(hash);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    const initialTimeout = setTimeout(scrollToHash, 800);

    const handleHashChange = () => {
      setTimeout(scrollToHash, 100);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <ScrollProgress />
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
