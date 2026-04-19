'use client';

import { useEffect, useState } from 'react';
import { fetchExperiences, type Experience } from '@/lib/api';
import { SectionHeader } from './section-header';

export function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <section id="experience" className="px-10">
        <SectionHeader title="experience" />
        <div className="animate-pulse space-y-7">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-[#18181b] rounded" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="px-10">
        <SectionHeader title="experience" />
        <div className="text-red-500 text-sm">Error: {error}</div>
      </section>
    );
  }

  return (
    <section id="experience" className="px-10">
      <SectionHeader title="experience" />

      <div className="space-y-7">
        {experiences.map((exp) => (
          <div key={exp.id} className="grid grid-cols-[90px_1fr]">
            {/* Timeline */}
            <div className="font-mono text-[10px] text-[#27272a] text-right pr-5 pt-[3px] leading-[1.9]">
              {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              <br />
              —
              <br />
              {exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
            </div>

            {/* Content */}
            <div className="border-l border-[#27272a]/50 pl-5 relative">
              {/* Node */}
              <div
                className={`absolute left-[-5px] top-[5px] w-2 h-2 rounded-full bg-[#09090b] border-[1.5px] ${
                  exp.is_current ? 'border-[#4ade80]' : 'border-[#27272a]'
                }`}
              ></div>

              <div className="text-sm font-semibold text-[#f4f4f5]">
                {exp.role}
              </div>

              <div className="font-mono text-xs text-[#4ade80] mt-[3px] mb-1 flex items-center gap-2">
                {exp.company}
                <span className="text-[9px] text-[#3f3f46] bg-[#18181b] border border-[#27272a]/50 px-[7px] py-[2px] rounded">
                  {exp.employment_type}
                </span>
              </div>

              {exp.location && (
                <div className="text-[9px] text-[#3f3f46] mb-2 font-mono">
                  📍 {exp.location}
                </div>
              )}

              {exp.bullets && exp.bullets.map((bullet) => (
                <div
                  key={bullet.id}
                  className="flex gap-[7px] text-xs text-[#52525b] leading-[1.65] mb-[3px]"
                >
                  <span className="text-[#4ade80] opacity-35 flex-shrink-0">
                    ›
                  </span>
                  <span>{bullet.content}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
