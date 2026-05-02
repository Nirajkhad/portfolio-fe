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
      <section id="contact" className="px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20">
        <SectionHeader title="contact" />
        <div className="animate-pulse border border-[#27272a]/50 rounded-xl p-8 sm:p-10 md:p-12">
          <div className="h-8 bg-[#18181b] rounded w-48 mb-4 mx-auto"></div>
          <div className="h-16 bg-[#18181b] rounded w-64 mb-4 mx-auto"></div>
        </div>
      </section>
    );
  }

  if (state.error || !state.data) {
    return (
      <section id="contact" className="px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20">
        <SectionHeader title="contact" />
        <div className="text-red-500 text-sm text-center">
          Failed to load contact data. {state.error && `Error: ${state.error}`}
        </div>
      </section>
    );
  }

  const { email, social_links } = state.data;

  return (
    <section id="contact" className="px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20">
      <SectionHeader title="contact" />

      <div className="border border-[#27272a]/50 rounded-xl p-8 sm:p-10 md:p-12 text-center flex flex-col items-center gap-5">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#f9fafb]"
          style={{ letterSpacing: '-0.03em' }}
        >
          Let's work together
        </h2>

        <p className="text-sm sm:text-base text-[#d1d5db] leading-relaxed max-w-full sm:max-w-[450px] px-2 sm:px-0">
          Got a project in mind? Reach out and let's create something amazing together.
        </p>

        {email && (
          <button
            onClick={() => (globalThis.window.location.href = `mailto:${email}`)}
            className="flex items-center gap-2.5 bg-[#4ade80] text-[#09090b] text-sm sm:text-base font-bold px-6 sm:px-7 py-3 rounded-lg hover:bg-[#22c55e] transition-colors cursor-pointer"
          >
            <span>✉</span>
            <span>Send me an email</span>
          </button>
        )}

        {social_links.length > 0 && (
          <div className="flex gap-5 sm:gap-6 flex-wrap justify-center">
            {social_links.map((social) => (
              <button
                key={social.id}
                onClick={() =>
                  globalThis.window?.open(social.url, '_blank', 'noopener,noreferrer')
                }
                className="text-sm sm:text-base text-[#9ca3af] hover:text-[#4ade80] transition-colors cursor-pointer font-medium"
              >
                {social.platform} →
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
