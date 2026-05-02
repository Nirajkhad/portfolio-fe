'use client';

import { useEffect, useState } from 'react';
import { fetchSkillsGrouped, type SkillCategory } from '@/lib/api';
import { SectionHeader } from './section-header';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const colorMap: Record<string, string> = {
  'Languages': 'text-[#9ca3af] bg-[#18181b] border-[#27272a]',
  'Frameworks': 'text-[#9ca3af] bg-[#18181b] border-[#27272a]',
  'Databases': 'text-[#9ca3af] bg-[#18181b] border-[#27272a]',
  'Tools': 'text-[#9ca3af] bg-[#18181b] border-[#27272a]',
  'Cloud': 'text-[#9ca3af] bg-[#18181b] border-[#27272a]',
  'DevOps': 'text-[#9ca3af] bg-[#18181b] border-[#27272a]',
};

const defaultColor = 'text-[#9ca3af] bg-[#18181b] border-[#27272a]';

export function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchSkillsGrouped();
        setSkillCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <section id="skills" className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20 flex flex-col justify-center py-16" ref={ref}>
      <SectionHeader title="skills" />

      {loading ? (
        <div className="animate-pulse flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-[#18181b] border border-[#27272a] rounded-xl" />
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
        {skillCategories.map((category) => (
          <div
            key={category.category}
            className="border border-[#27272a]/50 rounded-xl p-4 sm:p-5 hover:border-[#4ade80]/40 transition-colors duration-200"
          >
            <div className="font-mono text-xs sm:text-sm font-medium text-[#f9fafb] mb-3">
              {category.category}
            </div>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.id}
                  className={`text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-md border ${colorMap[category.category] || defaultColor}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
        </div>
      )}
    </section>
  );
}
