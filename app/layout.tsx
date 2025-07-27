import type {Metadata} from 'next'
import {GeistSans} from 'geist/font/sans'
import {GeistMono} from 'geist/font/mono'

import './globals.css'

export const metadata: Metadata = {
  title: 'QR Code Generator',
  description: 'Create beautiful, customizable QR codes instantly. Perfect for businesses, events, and personal use.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
