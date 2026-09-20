import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'شروق نادي | Shourk Nady — Luxury Abayas & Modest Fashion UAE',
  description: 'Emirati luxury atelier crafting bespoke Japanese Silk Nida abayas, silk kaftans, and modest fashion couture in the United Arab Emirates.',
  keywords: ['Luxury Abaya UAE', 'Dubai Abayas', 'Japanese Nida Abaya', 'Silk Kaftan', 'عبايات دبي', 'عبايات سوداء فاخرة', 'قفطان حرير'],
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
