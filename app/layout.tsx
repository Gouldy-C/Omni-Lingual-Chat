import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import ClientProviders from '@/components/providers/ClientProviders'
import './globals.css'
import FirebaseAuthProvider from '@/components/providers/FirebaseAuthProvider'
import SubscriptionProvider from '@/components/providers/SubsciptionProvider'
import { Toaster } from '@/components/ui/toaster'

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
          <link rel="icon" href="/ol-logo.svg" sizes="any" media="(prefers-color-scheme:no-preference)"/>
          <link rel="icon" href="/ol-logo.svg" sizes="any" media="(prefers-color-scheme:light)"/>
          <link rel="icon" href="/ol-logo-light.svg" sizes="any" media="(prefers-color-scheme:dark)"/>
        </head>
        <body className={inter.className}>
          <FirebaseAuthProvider>
          <SubscriptionProvider>
          <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>

                <Header />

                {children}

                <Toaster/>
            </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  )
}
