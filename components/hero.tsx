'use client';

import { useEffect, useState } from 'react';
import { fetchPortfolioGeneralInfo, type PortfolioGeneralInfo } from '@/lib/api';
import { Typewriter } from './typewriter';

interface CtaButton {
  label: string;
  href: string;
  iconClass: string;
  isExternal: boolean;
}

interface HeroState {
  data: PortfolioGeneralInfo | null;
  loading: boolean;
  error: string | null;
}

export function Hero() {
  const [state, setState] = useState<HeroState>({
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
      <section id="home" className="pt-8 sm:pt-10 md:pt-[52px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="animate-pulse">
          <div className="h-4 bg-[#27272a] rounded w-32 mb-3"></div>
          <div className="h-14 bg-[#27272a] rounded w-48 mb-4"></div>
          <div className="h-6 bg-[#27272a] rounded w-64 mb-4"></div>
          <div className="h-20 bg-[#27272a] rounded w-full max-w-[500px] mb-5"></div>
        </div>
      </section>
    );
  }

  if (state.error || !state.data) {
    return (
      <section id="home" className="pt-8 sm:pt-10 md:pt-[52px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="text-red-500 text-sm">
          Failed to load portfolio data. {state.error && `Error: ${state.error}`}
        </div>
      </section>
    );
  }

  const { full_name, title, bio, location, social_links } = state.data;

  // Build CTA buttons from social links - use icon class from API directly
  const ctaButtons = social_links.map((link) => ({
    label: link.platform,
    href: link.url,
    iconClass: link.icon,
    isExternal: true,
  }));

  return (
    <section id="home" className="pt-8 sm:pt-10 md:pt-[52px] px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Kicker line */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px w-5 sm:w-7 bg-[#4ade80] opacity-40"></div>
        <p className="font-mono text-[10px] sm:text-[11px] text-[#4ade80] tracking-[0.08em]">
          hello, world — I'm
        </p>
      </div>

      {/* Name */}
      <h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-[#fafafa] leading-none"
        style={{ letterSpacing: '-0.04em' }}
      >
        {full_name}
      </h1>

      {/* Role */}
      <p className="font-mono text-sm sm:text-base md:text-lg text-[#3f3f46] mt-2 mb-5">{`// ${title}`}</p>

      {/* Bio with Typewriter Effect */}
      <p className="text-xs sm:text-sm text-[#71717a] leading-[1.8] mb-5 max-w-full sm:max-w-[500px] min-h-[3rem]">
        <Typewriter 
          text={bio} 
          speed={30} 
          delay={500}
          cursor={true}
        />
      </p>

      {/* Location */}
      <div className="flex items-center gap-[7px] mb-6 font-mono text-[10px] sm:text-[11px] text-[#27272a]">
        <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse opacity-60"></span>
        <span>{location}</span>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {ctaButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => {
              if (btn.isExternal) {
                globalThis.window?.open(btn.href, '_blank', 'noopener,noreferrer');
              } else {
                globalThis.window.location.href = btn.href;
              }
            }}
            className={`font-mono text-[10px] sm:text-[11px] px-3 sm:px-3.5 py-[6px] sm:py-[7px] rounded-md transition-all duration-200 inline-flex items-center gap-[6px] sm:gap-[7px] cursor-pointer border border-[#27272a]/50 text-[#52525b] hover:text-[#4ade80] hover:border-[#4ade80]`}
          >
            <i className={`${btn.iconClass} text-[11px] sm:text-[12px]`} />
            <span>{btn.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
