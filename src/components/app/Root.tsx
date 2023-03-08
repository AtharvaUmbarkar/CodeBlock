'use client';

import React, { useState } from 'react'

import montserrat from "@/fonts/montserrat";
import NavBar from '@/components/app/NavBar';

import { QueryClient, QueryClientProvider } from 'react-query';
import NavDrawer from './NavDrawer';

const queryClient = new QueryClient();

const Root = ({ children }: { children: React.ReactNode }) => {
  const [allowScroll, setAllowScroll] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

  const toggleScroll = (): void => {
    setAllowScroll((allowScroll) => allowScroll = !allowScroll);
  }

  const openNav = () => {
    setNavOpen(true);
    setAllowScroll(false);
  }
  const closeNav = () => {
    setNavOpen(false);
    setAllowScroll(true);
  }
  const toggleNav = () => {
    setNavOpen(!navOpen);
    toggleScroll();
  }

  return (
    <QueryClientProvider client={queryClient}>
        <body className={(allowScroll ? 'tw-overflow-y-auto' : 'tw-overflow-y-hidden')}>
          <div id='next-root' className={`${montserrat.variable} tw-font-montserrat tw-min-h-full tw-flex tw-flex-col`}>
            <NavBar toggleNav={toggleNav} />
            <NavDrawer navOpen={navOpen} closeNav={closeNav}>
              {children}
            </NavDrawer>
          </div>
        </body>
    </QueryClientProvider>
  )
}

export default Root