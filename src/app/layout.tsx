import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://imshn.dev'),
  title: 'SaaS Development for Startups | Mohammed Shahnawaz',
  description:
    'SaaS MVP and fullstack development for startups. Build fast, scale reliably, and launch with confidence.',
  keywords: [
    'SaaS development',
    'SaaS MVP development',
    'fullstack developer for startups',
    'build SaaS product',
    'scalable backend development',
    'MVP development for startups',
    'API development',
    'startup product development'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'SaaS Development for Startups',
    description:
      'Build your SaaS product faster with MVP development, fullstack engineering, and scalable backend systems.',
    url: '/',
    siteName: 'Mohammed Shahnawaz',
    images: [{ url: '/portfolio.png' }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Development for Startups',
    description: 'Launch your SaaS MVP faster and scale with reliable fullstack systems.',
    images: ['/portfolio.png']
  },
  verification: {
    google: 'x7X_3UeYU9912nqoI'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MCQRSGNL');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MCQRSGNL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
