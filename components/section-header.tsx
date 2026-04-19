interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2.5 mb-7">
      <span className="font-mono text-[13px] text-[#4ade80]">./</span>
      <span className="text-base font-semibold text-[#e4e4e7] tracking-tight">
        {title}
      </span>
      <div className="flex-1 h-px bg-[#1a1a1e]"></div>
    </div>
  );
}
