'use client';

import { useEffect, useState } from 'react';
import { fetchSkillsGrouped, type SkillCategory } from '@/lib/api';
import { SectionHeader } from './section-header';
import { EmptySection } from './empty-section';
import { usePageRefresh } from '@/hooks/use-page-refresh';

export function Skills() {
  const refresh = usePageRefresh();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try { if (skillCategories.length === 0) setLoading(true); setSkillCategories(await fetchSkillsGrouped()); }
      catch (err) { setError(err instanceof Error ? err.message : 'Failed'); }
      finally { setLoading(false); }
    };
    loadData();
  }, [refresh]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    const el = document.getElementById('skills');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let content;
  if (loading) {
    content = (
      <div className="animate-pulse flex flex-col gap-4">
        {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-[#10101a] border border-[#1e1e2a] rounded-lg" />)}
      </div>
    );
  } else if (error) {
    content = <div className="text-[#ef4444] text-sm font-mono">{error}</div>;
  } else if (!skillCategories || skillCategories.length === 0) {
    content = <EmptySection message="No skills to show yet." />;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, i) => {
          const delay = i * 80;
          return (
            <div
              key={category.category}
              className="bg-[#10101a] border border-[#1e1e2a] rounded-lg p-4 sm:p-5 hover:bg-[#141420] hover:border-[#2a2a3a] transition-all duration-200"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms` }}
            >
              <div className="font-mono text-xs sm:text-sm font-medium text-[#a78bfa] mb-3 flex items-center gap-2">
                <span className="text-[#52525b]">#</span>
                {category.category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span key={skill.id} className="font-mono text-[11px] px-2.5 py-[3px] rounded border border-[#1e1e2a] bg-[#0a0a0f] text-[#a1a1aa] hover:border-[#a78bfa]/20 hover:text-[#a78bfa] transition-all duration-200 inline-flex items-center gap-1 before:w-1 before:h-1 before:rounded-full before:bg-[#52525b] hover:before:bg-[#a78bfa]">{skill.name}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section id="skills" className="relative min-h-screen bg-[#0a0a0f] border-t border-[#1e1e2a] border-b border-[#1e1e2a] px-4 sm:px-8 lg:px-16 flex flex-col justify-center py-20 sm:py-24">
      <SectionHeader title="skills" number="03" accent="violet" />
      {content}
    </section>
  );
}
