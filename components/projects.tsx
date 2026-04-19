'use client';

import { useEffect, useState } from 'react';
import { fetchFeaturedProjects, fetchProjects, type Project } from '@/lib/api';
import { SectionHeader } from './section-header';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <section id="projects" className="px-10">
        <SectionHeader title="projects" />
        <div className="grid grid-cols-2 gap-2.5 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-[#18181b] rounded" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="px-10">
        <SectionHeader title="projects" />
        <div className="text-red-500 text-sm">Error: {error}</div>
      </section>
    );
  }

  const featuredProject = projects.find((p) => p.is_featured);
  const otherProjects = projects.filter((p) => !p.is_featured);

  return (
    <section id="projects" className="px-10">
      <SectionHeader title="projects" />

      <div className="grid grid-cols-2 gap-2.5">
        {/* Featured Project */}
        {featuredProject && (
          <div className="col-span-2 border border-[#27272a]/50 rounded-[10px] p-5 relative">
            <div className="absolute top-3.5 right-3.5 font-mono text-[9px] text-[#4ade80] border border-[#4ade80]/20 bg-[#4ade80]/5 px-2 py-[3px] rounded">
              featured
            </div>

            <div className="text-sm font-semibold text-[#e4e4e7] mb-[7px]">
              {featuredProject.title}
            </div>

            <div className="text-xs text-[#3f3f46] leading-[1.6] mb-2.5">
              {featuredProject.description}
            </div>

            <div className="flex flex-wrap gap-[5px] mb-2.5">
              {featuredProject.tech_stacks?.map((tech) => (
                <span
                  key={tech.id}
                  className="font-mono text-[9px] text-[#3f3f46] bg-[#18181b] px-[7px] py-[3px] rounded"
                >
                  {tech.name}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {featuredProject.github_url && (
                <button
                  onClick={() => window.open(featuredProject.github_url, '_blank')}
                  className="font-mono text-[11px] text-[#27272a] hover:text-[#4ade80] transition-colors cursor-pointer"
                >
                  ⌥ GitHub
                </button>
              )}
              {featuredProject.live_url && (
                <button
                  onClick={() => window.open(featuredProject.live_url, '_blank')}
                  className="font-mono text-[11px] text-[#27272a] hover:text-[#4ade80] transition-colors cursor-pointer"
                >
                  ⌥ Live
                </button>
              )}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.map((project) => (
          <div
            key={project.id}
            className="border border-[#1a1a1e] rounded-[10px] p-4"
          >
            <div className="text-sm font-semibold text-[#e4e4e7] mb-[7px]">
              {project.title}
            </div>

            <div className="text-xs text-[#3f3f46] leading-[1.6] mb-2.5">
              {project.description}
            </div>

            <div className="flex flex-wrap gap-[5px] mb-2.5">
              {project.tech_stacks?.map((tech) => (
                <span
                  key={tech.id}
                  className="font-mono text-[9px] text-[#3f3f46] bg-[#18181b] px-[7px] py-[3px] rounded"
                >
                  {tech.name}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.github_url && (
                <button
                  onClick={() => window.open(project.github_url, '_blank')}
                  className="font-mono text-[11px] text-[#27272a] hover:text-[#4ade80] transition-colors cursor-pointer"
                >
                  ⌥ GitHub
                </button>
              )}
              {project.live_url && (
                <button
                  onClick={() => window.open(project.live_url, '_blank')}
                  className="font-mono text-[11px] text-[#27272a] hover:text-[#4ade80] transition-colors cursor-pointer"
                >
                  ⌥ Live
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
