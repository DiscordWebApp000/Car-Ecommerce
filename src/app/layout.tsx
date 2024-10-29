import { Metadata } from 'next';
import { Roboto } from 'next/font/google'; // Roboto fontunu ekliyoruz
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';

const roboto = Roboto({ subsets: ['latin'], weight: '400' }); // Roboto fontunu tanımlıyoruz

export const metadata: Metadata = {
  title: 'Car E-commerce',
  description: 'Buy your favorite car online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}> {/* Bebas Neue yerine Roboto kullanılıyor */}
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
