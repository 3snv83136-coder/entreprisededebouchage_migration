import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans } from 'next/font/google';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyCta from '@/components/layout/StickyCta';
import CallbackForm from '@/components/common/CallbackForm';
import { generateSchemaOrganization } from '@/lib/seo/schema';
import { COMPANY_NAME, BASE_URL } from '@/lib/config';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_NAME} — Debouchage dans le Var 24h/7j`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: `${COMPANY_NAME} : debouchage canalisations, WC, évier à Toulon et dans le Var. Intervention rapide 24h/7j, devis gratuit.`,
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo-edd.png',
    apple: '/logo-edd.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateSchemaOrganization();

  return (
    <html lang="fr" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-body), sans-serif' }}>
        <Topbar />
        <Navbar />
        <main className="site-main">{children}</main>
        <Footer />
        <StickyCta />
        <CallbackForm />
      </body>
    </html>
  );
}
