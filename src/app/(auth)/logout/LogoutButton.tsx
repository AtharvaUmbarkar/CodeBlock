'use client';

import React from 'react'
import { signOut } from 'next-auth/react';
import Button from '@mui/material/Button';

const LogoutButton = () => {
    return (
        <div className='tw-flex tw-flex-col tw-items-center'>
            <p className='tw-text-center tw-text-xl'>Are you sure you want to Logout?</p>
            <Button
                variant='contained'
                sx={{ margin: 2 }}
                onClick={() => signOut({ callbackUrl: '/' })}
            >
                Logout
            </Button>
        </div>
    )
}

export default LogoutButton