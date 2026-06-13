interface SectionHeaderProps {
  readonly title: string;
  readonly number: string;
  readonly accent?: 'green' | 'cyan' | 'violet' | 'amber';
}

const accentMap = {
  green: '#4ade80',
  cyan: '#22d3ee',
  violet: '#a78bfa',
  amber: '#f59e0b',
};

export function SectionHeader({ title, number, accent = 'green' }: SectionHeaderProps) {
  const accentColor = accentMap[accent];

  return (
    <div className="flex items-center gap-[6px] font-mono text-xs text-[#52525b] mb-5" role="group" aria-label={title}>
      <span style={{ color: accentColor }}>//</span>
      <span className="text-[#52525b]">{number}.</span>
      <h2 className="font-medium m-0 text-xs" style={{ color: accentColor }}>{title}</h2>
      <span className="flex-1 h-px bg-[#1e1e2a]" />
    </div>
  );
}
