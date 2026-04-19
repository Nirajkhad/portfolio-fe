'use client';

import { useEffect, useState } from 'react';
import { fetchSkillsGrouped, type SkillCategory } from '@/lib/api';
import { SectionHeader } from './section-header';

const colorMap: Record<string, string> = {
  'Languages': 'text-[#86efac] bg-[#0d1f14] border-[#1a3a22]',
  'Frameworks': 'text-[#5eead4] bg-[#0a1e1a] border-[#133028]',
  'Databases': 'text-[#93c5fd] bg-[#0d1829] border-[#162340]',
  'Tools': 'text-[#fcd34d] bg-[#1a1408] border-[#2e2210]',
  'Cloud': 'text-[#c4b5fd] bg-[#160f28] border-[#271a40]',
  'DevOps': 'text-[#a1a1aa] bg-[#18181b] border-[#27272a]',
};

const defaultColor = 'text-[#a1a1aa] bg-[#18181b] border-[#27272a]';

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
      <section id="skills" className="px-10">
        <SectionHeader title="skills" />
        <div className="animate-pulse flex flex-col gap-3.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-[#18181b] rounded" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="px-10">
        <SectionHeader title="skills" />
        <div className="text-red-500 text-sm">Error: {error}</div>
      </section>
    );
  }

  return (
    <section id="skills" className="px-10">
      <SectionHeader title="skills" />

      <div className="flex flex-col gap-3.5">
        {skillCategories.map((category) => (
          <div
            key={category.category}
            className="grid grid-cols-[90px_1fr] gap-4 items-start"
          >
            <div className="font-mono text-[10px] text-[#27272a] text-right">
              {category.category}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <span
                  key={skill.id}
                  className={`text-xs font-medium px-[11px] py-1 rounded-md border ${colorMap[category.category] || defaultColor}`}
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
