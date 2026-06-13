'use client';

import { useEffect, useState } from 'react';
import { fetchPortfolioGeneralInfo, type PortfolioGeneralInfo } from '@/lib/api';
import { SectionHeader } from './section-header';
import { usePageRefresh } from '@/hooks/use-page-refresh';

interface ContactState {
  data: PortfolioGeneralInfo | null;
  loading: boolean;
  error: string | null;
}

export function Contact() {
  const refresh = usePageRefresh();
  const [state, setState] = useState<ContactState>({ data: null, loading: true, error: null });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try { setState((prev) => ({ ...prev, loading: true, error: null })); setState({ data: await fetchPortfolioGeneralInfo(), loading: false, error: null }); }
      catch (error) { setState({ data: null, loading: false, error: error instanceof Error ? error.message : 'Failed' }); }
    };
    loadData();
  }, [refresh]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    const el = document.getElementById('contact');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { email, social_links } = state.data || { email: '', social_links: [] };

  return (
    <section id="contact" className="relative min-h-screen bg-[#0a0a0f] border-t border-[#1e1e2a] px-4 sm:px-8 lg:px-16 flex flex-col justify-center py-20 sm:py-24">
      <SectionHeader title="contact" number="05" accent="green" />

      {state.loading ? (
        <div className="animate-pulse bg-[#10101a] border border-[#1e1e2a] rounded-lg p-10 sm:p-12 text-center">
          <div className="h-6 bg-[#1e1e2a] rounded w-48 mb-3 mx-auto" />
          <div className="h-14 bg-[#1e1e2a] rounded w-64 mx-auto" />
        </div>
      ) : state.error || !state.data ? (
        <div className="text-[#ef4444] text-sm font-mono text-center">{state.error}</div>
      ) : (
        <div
          className="bg-[#10101a] border border-[#1e1e2a] rounded-lg p-8 sm:p-10 text-center flex flex-col items-center gap-5 relative overflow-hidden"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          <div className="font-mono text-xs text-[#52525b]">$ echo &quot;let&apos;s work together&quot;</div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#e4e4e7]">Let&apos;s work together</h2>
          <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-[500px]">Got a project in mind? Reach out and let&apos;s create something amazing together.</p>

          <div className="flex flex-col items-center gap-4 mt-2">
            {email && (
              <button
                onClick={() => (globalThis.window.location.href = `mailto:${email}`)}
                className="inline-flex items-center gap-2.5 bg-[#4ade80] text-[#0a0a0f] text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#22c55e] hover:scale-[1.02] hover:shadow-lg hover:shadow-[#4ade80]/20 active:scale-95 transition-all duration-200 cursor-pointer font-mono"
              >
                <span className="truncate max-w-[200px] sm:max-w-none">$ mail {email.split('@')[0]}</span>
              </button>
            )}

            {social_links.length > 0 && (
              <div className="flex gap-4 flex-wrap justify-center">
                {social_links.map((social) => (
                  <button
                    key={social.id}
                    onClick={() => globalThis.window?.open(social.url, '_blank', 'noopener,noreferrer')}
                    className="group font-mono text-xs text-[#52525b] hover:text-[#4ade80] transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 active:scale-95"
                  >
                    <span className="text-[10px]">$</span>
                    {social.platform}
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">&#8599;</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
