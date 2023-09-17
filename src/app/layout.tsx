import type { Metadata } from 'next'
import Navbar from './navbar'
import Footer from './footer'

export const metadata: Metadata = {
  title: 'takagi.dev',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
