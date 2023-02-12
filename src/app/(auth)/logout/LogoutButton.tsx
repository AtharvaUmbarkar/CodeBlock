'use client';

import React from 'react'
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
    return (
        <div className='flex flex-col items-center'>
            <p className='text-center text-xl'>Are you sure you want to Logout?</p>
            <button
                type='button'
                className='daisy-btn animate-none transition-none bg-blue-600 text-white border-blue-600 hover:bg-blue-500 hover:border-blue-500 rounded-sm shadow mt-4'
                onClick={() => signOut({ callbackUrl: '/' })}
            >
                Logout
            </button>
        </div>
    )
}

export default LogoutButton