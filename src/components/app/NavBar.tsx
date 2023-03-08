/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react'
import { useSession } from 'next-auth/react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import Menu from '@mui/icons-material/Menu';
import Link from 'next/link';

interface NavProps {
  toggleNav: () => void,
}

const NavBar = ({ toggleNav }: NavProps) => {
  const { data: session } = useSession();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge='start' disableTouchRipple size='large' sx={{ display: { lg: 'none' } }} onClick={toggleNav}>
          <Menu sx={{ color: 'black.main' }} />
        </IconButton>
        <Link href={'/'}>
          <Box sx={{ flexGrow: 1 }} display='flex' flexDirection='row'>
            <img src={'/icons/code-block-solid-secondary.svg'} className='tw-h-8 md:tw-h-10 tw-mx-2' alt='logo not found' />
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: 24, md: 28 } }} component="div" color={'black.main'}>
              Code
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: 24, md: 28 } }} component="div" color={'primary.main'}>
              Block
            </Typography>
          </Box>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar