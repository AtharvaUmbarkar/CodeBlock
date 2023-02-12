'use client';

import React, { useState } from 'react'
import { useSession } from 'next-auth/react';

import montserrat from "@/fonts/montserrat";
import NavBar from '@/components/app/NavBar';

import '@/styles/globals.css'

const Root = ({ children }: { children: React.ReactNode }) => {
    const [allowScroll, setAllowScroll] = useState(true)

    const { data: session } = useSession();
    // console.log(session)

    const toggleScroll = (): void => {
        setAllowScroll((allowScroll) => allowScroll = !allowScroll);
    }
    return (
        <body className={(allowScroll ? 'overflow-y-auto' : 'overflow-y-hidden')}>
            <div className={`${montserrat.variable} font-montserrat w-full min-h-full flex flex-col lg:flex-row lg:items-start text-black`}>
                <NavBar toggleScroll={toggleScroll} />
                {children}
            </div>
        </body>
    )
}

export default Root