interface SectionHeaderProps {
  readonly title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 mb-6 sm:mb-7 md:mb-8">
      <span className="font-mono text-xs sm:text-sm text-[#4ade80]">./</span>
      <span className="text-sm sm:text-base font-semibold text-[#f9fafb] tracking-tight">
        {title}
      </span>
      <div className="flex-1 h-px bg-[#27272a]"></div>
    </div>
  );
}
