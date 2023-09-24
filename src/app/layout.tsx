import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import NavBar from '@/app/components/molecules/nav-bar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={twMerge(inter.className)}>
        
        {/* Navigation Bar */}
        <div className="p-8 sticky z-10 top-0 flex justify-center">
          <NavBar />
        </div>

        <main>{children}</main>
      </body>
    </html>
  );
}
