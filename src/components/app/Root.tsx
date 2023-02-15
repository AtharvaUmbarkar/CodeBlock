'use client';

import React, { useState } from 'react'
import { useSession } from 'next-auth/react';

import montserrat from "@/fonts/montserrat";
import NavBar from '@/components/app/NavBar';

import '@/styles/globals.css'

const Root = ({ children }: { children: React.ReactNode }) => {
    const [allowScroll, setAllowScroll] = useState(true)

    const toggleScroll = (): void => {
        setAllowScroll((allowScroll) => allowScroll = !allowScroll);
    }

    return (
        <body className={(allowScroll ? 'overflow-y-auto' : 'overflow-y-hidden')}>
            <div id='next-root' className={`${montserrat.variable} font-montserrat w-full min-h-full flex flex-col lg:flex-row lg:items-start text-black`}>
                <NavBar toggleScroll={toggleScroll} />
                {children}
            </div>
        </body>
    )
}

export default Root