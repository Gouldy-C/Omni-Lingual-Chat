import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { ThemeProvider } from "@/components/ThemeProvider"
import ClientProviders from '@/components/ClientProviders'
import './globals.css'
import FirebaseAuthProvider from '@/components/FirebaseAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Omni-Lingual',
  description: 'Chat with anyone, anywhere in the world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <head>
          <link rel="icon" href="/ol-logo.svg" sizes="any"/>
        </head>
        <body className={inter.className}>
          <FirebaseAuthProvider>
            <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange>

              <Header />

              {children}

            </ThemeProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  )
}
