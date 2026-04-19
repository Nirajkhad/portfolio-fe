'use client';

import { contactData } from '@/lib/portfolio-data';
import { SectionHeader } from './section-header';

export function Contact() {
  return (
    <section id="contact" className="px-10">
      <SectionHeader title="contact" />

      <div className="border border-[#1a1a1e] rounded-xl p-10 text-center flex flex-col items-center gap-3.5">
        <h2
          className="text-2xl font-bold text-[#fafafa]"
          style={{ letterSpacing: '-0.03em' }}
        >
          {contactData.title}
        </h2>

        <p className="text-[13px] text-[#3f3f46] leading-[1.6] max-w-[360px]">
          {contactData.subtitle}
        </p>

        <button
          onClick={() => (window.location.href = contactData.ctaHref)}
          className="flex items-center gap-2 bg-[#4ade80] text-[#09090b] text-[13px] font-bold px-6 py-2.5 rounded-lg hover:bg-[#22c55e] transition-colors cursor-pointer"
        >
          <span>✉</span>
          <span>{contactData.ctaLabel}</span>
        </button>

        <div className="flex gap-5">
          {contactData.socials.map((social) => (
            <button
              key={social.label}
              onClick={() =>
                window.open(social.href, '_blank', 'noopener,noreferrer')
              }
              className="font-mono text-[11px] text-[#27272a] hover:text-[#4ade80] transition-colors cursor-pointer"
            >
              ⌥ {social.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
