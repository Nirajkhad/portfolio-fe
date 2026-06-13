import type { Metadata } from 'next'
import { Space_Grotesk, Fira_Code } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' });

const siteUrl = 'https://nirajkhadka.com';
const siteName = 'Niraj Khadka';
const description = 'Love Building things, learning new technologies, and sharing knowledge. This is my personal portfolio showcasing my projects, experience, and writing.';

export const metadata: Metadata = {
  title: {
    default: `${siteName} — Portfolio`,
    template: `%s | ${siteName}`,
  },
  description,
  generator: 'v0.app',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.svg',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: `${siteName} — Portfolio`,
    description,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Portfolio`,
    description,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Niraj Khadka',
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  sameAs: [
    'https://github.com/nirajkhadka',
    'https://linkedin.com/in/nirajkhadka',
  ],
  jobTitle: 'Backend Engineer',
  knowsAbout: ['Software Development', 'Backend Engineering', 'System Design'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${firaCode.variable}`} data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
          integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased">
        <Script id="bis-cleanup" strategy="beforeInteractive">
          {`new MutationObserver(function(m){m.forEach(function(r){r.target.removeAttribute('bis_skin_checked')})}).observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:['bis_skin_checked']})`}
        </Script>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
