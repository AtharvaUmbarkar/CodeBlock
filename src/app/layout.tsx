'use client';

import { useState } from 'react';

import '@/styles/globals.css'
import montserrat from "@/fonts/montserrat";

import NavBar from '@/components/app/NavBar';

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  const [allowScroll, setAllowScroll] = useState(true)

  const toggleScroll = (): void => {
    setAllowScroll((allowScroll) => allowScroll = !allowScroll);
  }

  return (
    <html lang="en">
      <head />
      <body className={(allowScroll ? 'overflow-y-auto' : 'overflow-y-hidden')}>
        <div className={`${montserrat.variable} font-montserrat w-full h-full flex flex-col lg:flex-row lg:items-start`}>
          <NavBar toggleScroll={toggleScroll} />
          {children}
        </div>
      </body>
    </html>
  )
}
