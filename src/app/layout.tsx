import './globals.css';
import {Inter} from '@next/font/google'

const interFont = Inter({
  weight:['400','700'],
  style:'normal',
  subsets:["latin"],
  display:"swap",
  variable: '--inter-font'
})

import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Youtube Video',
}
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" className={interFont.className}>
        <body className='w-screen h-screen'>{children}</body>
      </html>
    )
  }