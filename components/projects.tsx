'use client';

import { useEffect, useState } from 'react';
import { fetchProjects, type Project } from '@/lib/api';
import { SectionHeader } from './section-header';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { EmptySection } from './empty-section';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const allProjects = await fetchProjects();
        setProjects(allProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const featuredProject = projects.find((p) => p.is_featured);
  const otherProjects = projects.filter((p) => !p.is_featured);

  return (
    <section id="projects" className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20 flex flex-col justify-center py-16" ref={ref}>
      <SectionHeader title="projects" />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-[#18181b] border border-[#27272a] rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">Error: {error}</div>
      ) : projects.length === 0 ? (
        <EmptySection message="No projects to show yet." />
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.96)',
            transition: 'opacity 1600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'opacity, transform'
          }}
        >
        {/* Featured Project */}
        {featuredProject && (
          <div className="md:col-span-2 border border-[#27272a]/50 rounded-xl p-5 sm:p-6 relative hover:border-[#4ade80]/40 transition-colors duration-200">
            <div className="absolute top-4 right-4 font-mono text-[9px] text-[#4ade80] border border-[#4ade80]/30 bg-[#4ade80]/10 px-2.5 py-1 rounded-md">
              featured
            </div>

            <div className="text-sm sm:text-base font-semibold text-[#f9fafb] mb-2 pr-20">
              {featuredProject.title}
            </div>

            <div className="text-xs sm:text-sm text-[#d1d5db] leading-relaxed mb-3">
              {featuredProject.description}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {featuredProject.tech_stacks?.map((tech) => (
                <span
                  key={tech.id}
                  className="text-[10px] sm:text-xs text-[#9ca3af] bg-[#18181b] px-2.5 py-1 rounded-md border border-[#27272a]"
                >
                  {tech.name}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {featuredProject.github_url && (
                <button
                  onClick={() => window.open(featuredProject.github_url || '', '_blank')}
                  className="text-xs sm:text-sm text-[#9ca3af] hover:text-[#4ade80] transition-colors cursor-pointer font-medium"
                >
                  View Code →
                </button>
              )}
              {featuredProject.live_url && (
                <button
                  onClick={() => window.open(featuredProject.live_url || '', '_blank')}
                  className="text-xs sm:text-sm text-[#9ca3af] hover:text-[#4ade80] transition-colors cursor-pointer font-medium"
                >
                  Live Demo →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.map((project) => (
          <div
            key={project.id}
            className="border border-[#27272a]/50 rounded-xl p-5 hover:border-[#4ade80]/40 transition-colors duration-200"
          >
            <div className="text-sm sm:text-base font-semibold text-[#f9fafb] mb-2">
              {project.title}
            </div>

            <div className="text-xs sm:text-sm text-[#d1d5db] leading-relaxed mb-3">
              {project.description}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech_stacks?.map((tech) => (
                <span
                  key={tech.id}
                  className="text-[10px] sm:text-xs text-[#9ca3af] bg-[#18181b] px-2.5 py-1 rounded-md border border-[#27272a]"
                >
                  {tech.name}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {project.github_url && (
                <button
                  onClick={() => window.open(project.github_url || '', '_blank')}
                  className="text-xs sm:text-sm text-[#9ca3af] hover:text-[#4ade80] transition-colors cursor-pointer font-medium"
                >
                  View Code →
                </button>
              )}
              {project.live_url && (
                <button
                  onClick={() => window.open(project.live_url || '', '_blank')}
                  className="text-xs sm:text-sm text-[#9ca3af] hover:text-[#4ade80] transition-colors cursor-pointer font-medium"
                >
                  Live Demo →
                </button>
              )}
            </div>
          </div>
        ))}
        </div>
      )}
    </section>
  );
}
