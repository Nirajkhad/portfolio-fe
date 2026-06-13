'use client';

import { useEffect, useState } from 'react';
import { fetchProjects, type Project } from '@/lib/api';
import { SectionHeader } from './section-header';
import { EmptySection } from './empty-section';
import { usePageRefresh } from '@/hooks/use-page-refresh';

export function Projects() {
  const refresh = usePageRefresh();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try { if (projects.length === 0) setLoading(true); setProjects(await fetchProjects()); }
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
    const el = document.getElementById('projects');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const featuredProject = projects.find((p) => p.is_featured);
  const otherProjects = projects.filter((p) => !p.is_featured);

  return (
    <section id="projects" className="relative min-h-screen bg-[#10101a] border-b border-[#1e1e2a] px-4 sm:px-8 lg:px-16 flex flex-col justify-center py-20 sm:py-24">
      <SectionHeader title="projects" number="02" accent="cyan" />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-36 bg-[#0a0a0f] border border-[#1e1e2a] rounded-lg" />)}
        </div>
      ) : error ? (
        <div className="text-[#ef4444] text-sm font-mono">{error}</div>
      ) : projects.length === 0 ? (
        <EmptySection message="No projects to show yet." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredProject && (
            <div
              className="md:col-span-2 bg-[#0a0a0f] border border-[#1e1e2a] rounded-lg p-5 sm:p-6 relative overflow-hidden hover:bg-[#141420] hover:border-[#2a2a3a] transition-all duration-200"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[10px] text-[#22d3ee] border border-[#22d3ee]/20 bg-[#22d3ee]/8 px-2 py-0.5 rounded uppercase tracking-wider">featured</span>
              </div>
              <div className="text-base sm:text-lg font-semibold text-[#e4e4e7] mb-2">{featuredProject.title}</div>
              <div className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-4">{featuredProject.description}</div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {featuredProject.tech_stacks?.map((tech) => (
                  <span key={tech.id} className="font-mono text-[11px] px-2.5 py-[3px] rounded border border-[#1e1e2a] bg-[#10101a] text-[#a1a1aa] hover:border-[#22d3ee]/20 hover:text-[#22d3ee] transition-all duration-200 inline-flex items-center gap-1 before:w-1 before:h-1 before:rounded-full before:bg-[#52525b] hover:before:bg-[#22d3ee]">{tech.name}</span>
                ))}
              </div>
              <div className="flex gap-4">
                {featuredProject.github_url && (
                  <button onClick={() => window.open(featuredProject.github_url || '', '_blank')} className="group font-mono text-xs text-[#a1a1aa] hover:text-[#22d3ee] transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 active:scale-95">View Code<span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span></button>
                )}
                {featuredProject.live_url && (
                  <button onClick={() => window.open(featuredProject.live_url || '', '_blank')} className="group font-mono text-xs text-[#a1a1aa] hover:text-[#22d3ee] transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 active:scale-95">Live Demo<span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span></button>
                )}
              </div>
            </div>
          )}

          {otherProjects.map((project, i) => {
            const delay = i * 100;
            return (
              <div
                key={project.id}
                className="bg-[#0a0a0f] border border-[#1e1e2a] rounded-lg p-5 sm:p-6 hover:bg-[#141420] hover:border-[#2a2a3a] transition-all duration-200"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}
              >
                <div className="text-sm sm:text-base font-semibold text-[#e4e4e7] mb-2">{project.title}</div>
                <div className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-3">{project.description}</div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tech_stacks?.map((tech) => (
                    <span key={tech.id} className="font-mono text-[11px] px-2.5 py-[3px] rounded border border-[#1e1e2a] bg-[#10101a] text-[#a1a1aa] hover:border-[#22d3ee]/20 hover:text-[#22d3ee] transition-all duration-200 inline-flex items-center gap-1 before:w-1 before:h-1 before:rounded-full before:bg-[#52525b] hover:before:bg-[#22d3ee]">{tech.name}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.github_url && <button onClick={() => window.open(project.github_url || '', '_blank')} className="group font-mono text-xs text-[#a1a1aa] hover:text-[#22d3ee] transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 active:scale-95">View Code<span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span></button>}
                  {project.live_url && <button onClick={() => window.open(project.live_url || '', '_blank')} className="group font-mono text-xs text-[#a1a1aa] hover:text-[#22d3ee] transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 active:scale-95">Live Demo<span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span></button>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
