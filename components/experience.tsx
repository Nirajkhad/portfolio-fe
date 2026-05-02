'use client';

import { useEffect, useState } from 'react';
import { fetchExperiences, type Experience } from '@/lib/api';
import { SectionHeader } from './section-header';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { EmptySection } from './empty-section';

export function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchExperiences();
        setExperiences(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load experiences');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  let content;
  if (loading) {
    content = (
      <div className="animate-pulse flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-[#18181b] border border-[#27272a] rounded-xl" />
        ))}
      </div>
    );
  } else if (error) {
    content = <div className="text-red-500 text-sm">Error: {error}</div>;
  } else if (experiences.length === 0) {
    content = <EmptySection message="No experiences to show yet." />;
  } else {
    content = (
      <div
        className="flex flex-col gap-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.96)',
          transition: 'opacity 1600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'opacity, transform'
        }}
      >
        {experiences.map((exp) => (
          <div key={exp.id} className="border border-[#27272a]/50 rounded-xl p-5 sm:p-6 hover:border-[#4ade80]/40 transition-colors duration-200">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
              <div className="flex-1">
                <div className="text-sm sm:text-base font-semibold text-[#f9fafb] mb-1">
                  {exp.role}
                </div>
                <div className="font-mono text-xs sm:text-sm text-[#4ade80] flex items-center gap-2 flex-wrap">
                  {exp.company}
                  <span className="text-[#a1a1aa]">@</span>
                </div>
                <div className="text-xs text-[#a1a1aa] mt-1">
                  {/* Add date here if available in type */}
                </div>
              </div>
              {exp.location && (
                <div className="flex items-center gap-1 text-xs text-[#a1a1aa]">
                  <span>📍</span>
                  <span>{exp.location}</span>
                </div>
              )}
            </div>
            {exp.bullets && exp.bullets.length > 0 && (
              <div className="space-y-2">
                {exp.bullets.map((bullet) => (
                  <div
                    key={bullet.id}
                    className="flex gap-2 text-xs sm:text-sm text-[#d1d5db] leading-relaxed"
                  >
                    <span className="text-[#4ade80] opacity-50 flex-shrink-0 mt-[2px]">
                      ›
                    </span>
                    <span>{bullet.content}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <section id="experience" className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20 flex flex-col justify-center py-16" ref={ref}>
      <SectionHeader title="experience" />
      {content}
    </section>
  );
}

