import type { Metadata } from 'next'
import { Space_Grotesk, Fira_Code } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Niraj Khadka Portfolio',
  description: 'Love Building things, learning new technologies, and sharing knowledge. This is my personal portfolio showcasing my projects, experience, and writing.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-touch-icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${firaCode.variable} bg-[#09090b]`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
          integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Niraj Khadka Portfolio" />
        <meta property="og:description" content="Love Building things, learning new technologies, and sharing knowledge. This is my personal portfolio showcasing my projects, experience, and writing." />
        <meta property="og:url" content="https://nirajkhadka.com/" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Niraj Khadka Portfolio" />
        <meta name="twitter:description" content="Love Building things, learning new technologies, and sharing knowledge. This is my personal portfolio showcasing my projects, experience, and writing." />
        <meta name="twitter:image" content="/og-image.png" />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-[#09090b] text-[#fafafa]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
