import { footerData } from '@/lib/portfolio-data';

export function Footer() {
  return (
    <footer className="bg-[#0a0b0e] border-t border-[#1f2937] py-4 text-center font-mono text-[10px] sm:text-xs text-[#9ca3af] px-4">
      <div className="flex flex-wrap items-center justify-center gap-x-2">
        <span>{footerData.text}</span>
        <span className="hidden sm:inline">&nbsp;·&nbsp;</span>
        <span>{footerData.domain}</span>
        <span className="hidden sm:inline">&nbsp;·&nbsp;</span>
        <span>© {footerData.year}</span>
      </div>
    </footer>
  );
}
