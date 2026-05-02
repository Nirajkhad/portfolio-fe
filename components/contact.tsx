'use client';

import { useEffect, useState } from 'react';
import { fetchPortfolioGeneralInfo, type PortfolioGeneralInfo } from '@/lib/api';
import { SectionHeader } from './section-header';

interface ContactState {
  data: PortfolioGeneralInfo | null;
  loading: boolean;
  error: string | null;
}

export function Contact() {
  const [state, setState] = useState<ContactState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const data = await fetchPortfolioGeneralInfo();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load data',
        });
      }
    };

    loadData();
  }, []);

  if (state.loading) {
    return (
      <section id="contact" className="px-4 sm:px-6 md:px-8 lg:px-10">
        <SectionHeader title="contact" />
        <div className="animate-pulse border border-[#1a1a1e] rounded-xl p-6 sm:p-8 md:p-10">
          <div className="h-8 bg-[#27272a] rounded w-32 mb-3 mx-auto"></div>
          <div className="h-12 bg-[#27272a] rounded w-64 mb-4 mx-auto"></div>
        </div>
      </section>
    );
  }

  if (state.error || !state.data) {
    return (
      <section id="contact" className="px-4 sm:px-6 md:px-8 lg:px-10">
        <SectionHeader title="contact" />
        <div className="text-red-500 text-sm text-center">
          Failed to load contact data. {state.error && `Error: ${state.error}`}
        </div>
      </section>
    );
  }

  const { email, social_links } = state.data;

  return (
    <section id="contact" className="px-4 sm:px-6 md:px-8 lg:px-10">
      <SectionHeader title="contact" />

      <div className="border border-[#1a1a1e] rounded-xl p-6 sm:p-8 md:p-10 text-center flex flex-col items-center gap-3.5">
        <h2
          className="text-xl sm:text-2xl font-bold text-[#fafafa]"
          style={{ letterSpacing: '-0.03em' }}
        >
          Let's work together
        </h2>

        <p className="text-xs sm:text-[13px] text-[#3f3f46] leading-[1.6] max-w-full sm:max-w-[360px] px-2 sm:px-0">
          Got a project in mind? Reach out and let's create something amazing together.
        </p>

        {email && (
          <button
            onClick={() => (globalThis.window.location.href = `mailto:${email}`)}
            className="flex items-center gap-2 bg-[#4ade80] text-[#09090b] text-xs sm:text-[13px] font-bold px-5 sm:px-6 py-2.5 rounded-lg hover:bg-[#22c55e] transition-colors cursor-pointer"
          >
            <span>✉</span>
            <span>Send me an email</span>
          </button>
        )}

        {social_links.length > 0 && (
          <div className="flex gap-4 sm:gap-5 flex-wrap justify-center">
            {social_links.map((social) => (
              <button
                key={social.id}
                onClick={() =>
                  globalThis.window?.open(social.url, '_blank', 'noopener,noreferrer')
                }
                className="font-mono text-[10px] sm:text-[11px] text-[#27272a] hover:text-[#4ade80] transition-colors cursor-pointer"
              >
                ⌥ {social.platform}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
