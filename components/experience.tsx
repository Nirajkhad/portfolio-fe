'use client';

import { useEffect, useState } from 'react';
import { fetchExperiences, type Experience } from '@/lib/api';
import { SectionHeader } from './section-header';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

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

  return (
    <section id="experience" className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20 flex flex-col justify-center py-16" ref={ref}>
      <SectionHeader title="experience" />

      {loading ? (
        <div className="animate-pulse flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-[#18181b] border border-[#27272a] rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">Error: {error}</div>
      ) : (
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
                  <span className="text-[9px] sm:text-[10px] text-[#9ca3af] bg-[#18181b] border border-[#27272a] px-2 py-[3px] rounded-md">
                    {exp.employment_type}
                  </span>
                </div>
              </div>

              <div className="font-mono text-[10px] sm:text-xs text-[#71717a] sm:text-right flex-shrink-0">
                {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                {' — '}
                {exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
              </div>
            </div>

            {exp.location && (
              <div className="text-[10px] sm:text-xs text-[#9ca3af] mb-3 font-mono flex items-center gap-1">
                <span>📍</span>
                <span>{exp.location}</span>
              </div>
            )}

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
      )}
    </section>
  );
}
