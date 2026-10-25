import Script from 'next/script';
import App from '../src/App';
import './globals.css';

export const metadata = {
  title: 'Md. Najmul Hasan | Frontend Developer Portfolio',
  description:
    'Portfolio of Md. Najmul Hasan, a Frontend Developer building responsive, accessible web interfaces with React and Tailwind CSS, and learning backend development and AI/ML.',
  authors: [{ name: 'Md. Najmul Hasan' }],
  openGraph: {
    type: 'website',
    siteName: 'Md. Najmul Hasan',
    title: 'Md. Najmul Hasan | Frontend Developer Portfolio',
    description:
      'Responsive, user-friendly web interfaces built with React and Tailwind CSS. Currently expanding into backend development and AI/ML.',
  },
  twitter: {
    card: 'summary',
    title: 'Md. Najmul Hasan | Frontend Developer Portfolio',
    description:
      'Responsive, user-friendly web interfaces built with React and Tailwind CSS.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f6f1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){var root=document.documentElement;var theme='light';try{theme=localStorage.getItem('theme')||'light'}catch(e){}root.classList.toggle('dark',theme==='dark');root.style.colorScheme=theme==='dark'?'dark':'light'})()`}
        </Script>
      </head>
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
