import { footerData } from '@/lib/portfolio-data';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0c] border-t border-[#18181b] py-3.5 text-center font-mono text-[9px] sm:text-[10px] text-[#27272a] px-4">
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
