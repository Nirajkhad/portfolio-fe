'use client';

import { useEffect, useState } from 'react';
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
