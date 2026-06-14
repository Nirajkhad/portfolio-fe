import Image from 'next/image';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1e1e2a] bg-[#0a0a0f] px-4 sm:px-8 lg:px-16 py-5 sm:py-6">
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 justify-between text-[11px] sm:text-xs text-[#52525b] font-mono">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-navbar.svg"
            alt="NK Logo"
            width={28}
            height={18}
            style={{ width: 'auto', height: 'auto' }}
          />
          <span>&copy; {year} Niraj Khadka</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Built with Laravel &amp; Next.js</span>
          <span className="w-1 h-1 rounded-full bg-[#1e1e2a]" />
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
