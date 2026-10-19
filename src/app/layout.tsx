import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';
import { INVITATION_INFO } from '@/data/invitation';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: `Thiệp Mời Lễ Tốt Nghiệp | ${INVITATION_INFO.name}`,
  description: `Thư mời tham dự Lễ Tốt Nghiệp của ${INVITATION_INFO.name} tại ${INVITATION_INFO.university}. ${INVITATION_INFO.date}.`,
  icons: {
    icon: [
      { url: '/images/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/images/favicon.svg',
    apple: '/images/favicon.svg',
  },
  openGraph: {
    title: `Thiệp Mời Lễ Tốt Nghiệp | ${INVITATION_INFO.name}`,
    description: `Thư mời tham dự Lễ Tốt Nghiệp của ${INVITATION_INFO.name} tại ${INVITATION_INFO.university}. ${INVITATION_INFO.date}.`,
    images: [{ url: INVITATION_INFO.photoUrl }],
  },
};

export const viewport: Viewport = {
  themeColor: '#07080b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${cormorant.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
