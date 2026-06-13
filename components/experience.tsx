'use client';

import { useEffect, useState } from 'react';
import { fetchExperiences, type Experience } from '@/lib/api';
import { SectionHeader } from './section-header';
import { EmptySection } from './empty-section';
import { usePageRefresh } from '@/hooks/use-page-refresh';

export function Experience() {
  const refresh = usePageRefresh();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try { setLoading(true); setExperiences(await fetchExperiences()); }
      catch (err) { setError(err instanceof Error ? err.message : 'Failed to load experiences'); }
      finally { setLoading(false); }
    };
    loadData();
  }, [refresh]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    const el = document.getElementById('experience');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let content;
  if (loading) {
    content = (
      <div className="animate-pulse flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-[#10101a] border border-[#1e1e2a] rounded-lg" />
        ))}
      </div>
    );
  } else if (error) {
    content = <div className="text-[#ef4444] text-sm font-mono">{error}</div>;
  } else if (experiences.length === 0) {
    content = <EmptySection message="No experiences to show yet." />;
  } else {
    content = (
      <div className="flex flex-col gap-4">
        {experiences.map((exp, i) => {
          const delay = i * 100;
          return (
            <div
              key={exp.id}
              className="bg-[#10101a] border border-[#1e1e2a] rounded-lg border-l-2 border-l-transparent hover:border-l-[#4ade80] hover:bg-[#141420] hover:border-[#2a2a3a] transition-all duration-200 p-5 sm:p-6"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                <div>
                  <div className="text-sm sm:text-base font-semibold text-[#e4e4e7] mb-0.5">{exp.role}</div>
                  <div className="font-mono text-xs sm:text-sm text-[#4ade80]">{exp.company}</div>
                </div>
                {exp.location && (
                  <div className="font-mono text-[10px] sm:text-xs text-[#52525b] flex items-center gap-1.5 shrink-0">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {exp.location}
                  </div>
                )}
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <div className="space-y-1.5">
                  {exp.bullets.map((bullet) => (
                    <div key={bullet.id} className="flex gap-2.5 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                      <span className="text-[#4ade80]/50 shrink-0 mt-[3px] select-none">&#8250;</span>
                      <span>{bullet.content}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section id="experience" className="relative min-h-screen bg-[#0a0a0f] border-t border-[#1e1e2a] border-b border-[#1e1e2a] px-4 sm:px-8 lg:px-16 flex flex-col justify-center py-20 sm:py-24">
      <SectionHeader title="experience" number="01" accent="green" />
      {content}
    </section>
  );
}
