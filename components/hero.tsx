'use client';

import { useEffect, useState } from 'react';
import { fetchPortfolioGeneralInfo, type PortfolioGeneralInfo } from '@/lib/api';
import { usePageRefresh } from '@/hooks/use-page-refresh';

interface HeroState {
  data: PortfolioGeneralInfo | null;
  loading: boolean;
  error: string | null;
}

const lines = [
  { type: 'prompt', text: 'whoami', delay: 200 },
  { type: 'output', key: 'name', delay: 400 },
  { type: 'prompt', text: 'cat role.txt', delay: 600 },
  { type: 'output', key: 'title', delay: 800 },
  { type: 'prompt', text: 'echo $LOCATION', delay: 1000 },
  { type: 'output', key: 'location', delay: 1200 },
];

export function Hero() {
  const refresh = usePageRefresh();
  const [state, setState] = useState<HeroState>({
    data: null, loading: true, error: null,
  });
  const [visibleLines, setVisibleLines] = useState(0);

  const data = state.data;
  const name = data?.full_name ?? 'Niraj Kamdar';
  const title = data?.title ?? 'Full-Stack Developer';
  const location = data?.location ?? 'Kathmandu, Nepal';
  const socialLinks = data?.social_links ?? [];
  const bio = data?.bio ?? '';
  const showBio = bio.trim().length > 0;
  const outputValues = { name, title, location, bio };

  const allLines = showBio
    ? [...lines, { type: 'prompt' as const, text: 'cat about.md', delay: 1400 }, { type: 'output' as const, key: 'bio', delay: 1600 }]
    : lines;

  useEffect(() => {
    const loadData = async () => {
      try {
        setState({ data: await fetchPortfolioGeneralInfo(), loading: false, error: null });
      } catch (error) {
        setState({ data: null, loading: false, error: error instanceof Error ? error.message : 'Failed' });
      }
    };
    loadData();
  }, [refresh]);

  useEffect(() => {
    if (state.loading) return;
    const timers = allLines.map((l, i) => setTimeout(() => setVisibleLines((v) => Math.max(v, i + 1)), l.delay));
    return () => timers.forEach(clearTimeout);
  }, [state.loading, allLines]);

  if (state.loading) {
    return (
      <section id="home" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-20">
        <div className="animate-pulse max-w-[600px] w-full mx-auto">
          <div className="h-[260px] bg-[#10101a] border border-[#1e1e2a] rounded-xl" />
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-20 overflow-hidden">
      <h1 className="sr-only">{name} — {title} from {location}</h1>
      <div className="max-w-[640px] w-full mx-auto" style={{ animation: 'fade-in-up 0.6s ease both' }}>
        <div className="bg-[#0d0d18] border border-[#1e1e2a] rounded-xl overflow-hidden">
          <div className="bg-[#141420] border-b border-[#1e1e2a] px-3.5 py-[10px] flex items-center gap-2">
            <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f56]" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#27c93f]" />
            <span className="font-mono text-[11px] text-[#52525b] ml-2 truncate">terminal — niraj</span>
          </div>

          <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm leading-[1.8] min-h-[220px] sm:min-h-[240px]">
            {allLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', opacity: 0, animation: 'fade-in 0.4s ease forwards' }}>
                <span className="text-[#4ade80] shrink-0 select-none">$</span>
                {line.type === 'prompt' ? (
                  <span className="text-[#e4e4e7]">{line.text}</span>
                ) : (
                  <span className="text-[#4ade80]">{outputValues[line.key as keyof typeof outputValues]}</span>
                )}
              </div>
            ))}
            {visibleLines > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
                <span className="text-[#4ade80]">$</span>
                <span style={{ display: 'inline-block', width: '8px', height: '16px', background: '#4ade80', animation: 'cursor-blink 1s step-end infinite' }} />
              </div>
            )}
          </div>
        </div>

        {socialLinks.length > 0 && (
          <div className="flex gap-3 mt-6 flex-wrap">
            {socialLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => globalThis.window?.open(link.url, '_blank', 'noopener,noreferrer')}
                className="font-mono text-[11px] px-3.5 py-2 rounded-lg transition-all duration-200 cursor-pointer bg-[#10101a] border border-[#1e1e2a] text-[#a1a1aa] hover:text-[#4ade80] hover:border-[#4ade80]/30 hover:scale-105 hover:-translate-y-0.5 active:scale-95 inline-flex items-center gap-2"
              >
                <i className={`${link.icon} text-[11px] shrink-0`} />
                <span className="truncate max-w-[160px]">{link.platform}</span>
              </button>
            ))}
          </div>
        )}

        {visibleLines >= allLines.length && (
          <div className="flex justify-center pt-10 pb-2" style={{ animation: 'fade-in 0.6s ease 0.3s both' }}>
            <div className="flex flex-col items-center gap-1 text-[#52525b]">
              <svg className="w-4 h-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              <span className="text-[10px] font-mono">scroll</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
