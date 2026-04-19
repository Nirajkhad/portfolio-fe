import { footerData } from '@/lib/portfolio-data';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0c] border-t border-[#18181b] py-3.5 text-center font-mono text-[10px] text-[#27272a]">
      {footerData.text} &nbsp;·&nbsp; {footerData.domain} &nbsp;·&nbsp; ©{' '}
      {footerData.year}
    </footer>
  );
}
