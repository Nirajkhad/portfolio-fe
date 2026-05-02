'use client';

import { useEffect, useState } from 'react';
import { fetchSkillsGrouped, type SkillCategory } from '@/lib/api';
import { SectionHeader } from './section-header';

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

  if (loading) {
    return (
      <section id="skills" className="px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20">
        <SectionHeader title="skills" />
        <div className="animate-pulse flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-[#18181b] border border-[#27272a] rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20">
        <SectionHeader title="skills" />
        <div className="text-red-500 text-sm">Error: {error}</div>
      </section>
    );
  }

  return (
    <section id="skills" className="px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20">
      <SectionHeader title="skills" />

      <div className="flex flex-col gap-4">
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
    </section>
  );
}
