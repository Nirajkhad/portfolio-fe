"use client";
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
