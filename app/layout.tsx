import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyCta from '@/components/layout/StickyCta';
import CallbackForm from '@/components/common/CallbackForm';
import BackButton from '@/components/common/BackButton';
import { generateSchemaOrganization } from '@/lib/seo/schema';
import { COMPANY_NAME, BASE_URL } from '@/lib/config';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_NAME} — Debouchage dans les Bouches-du-Rhône 24h/7j`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: `${COMPANY_NAME} : debouchage canalisations, WC, évier à Aubagne et dans les Bouches-du-Rhône. Intervention rapide 24h/7j, devis gratuit.`,
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo-edd.png',
    apple: '/logo-edd.png',
  },
  other: {
    'geo.region': 'FR-13',
    'geo.placename': 'Bouches-du-Rhône, Provence-Alpes-Côte d\'Azur, France',
    'geo.position': '43.2927;5.5707',
    'ICBM': '43.2927, 5.5707',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateSchemaOrganization();

  return (
    <html lang="fr" className={`${plusJakarta.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": BASE_URL,
              "name": COMPANY_NAME,
              "description": "Entreprise de debouchage dans les Bouches-du-Rhône (13). Intervention 24h/7j sur 119 communes.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${BASE_URL}/debouchage-{city}/`
                },
                "query-input": "required name=city"
              }
            })
          }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-body), sans-serif' }}>
        <Topbar />
        <Navbar />
        <main className="site-main">{children}</main>
        <Footer />
        <StickyCta />
        <CallbackForm />
        <BackButton />
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('click', function(e) {
            var el = e.target;
            while (el && el !== document.body) {
              if (el.hasAttribute && el.hasAttribute('data-callback')) {
                e.preventDefault();
                e.stopPropagation();
                window.dispatchEvent(new Event('edd:open-callback'));
                return;
              }
              el = el.parentElement;
            }
          });
        `}} />
      </body>
    </html>
  );
}
