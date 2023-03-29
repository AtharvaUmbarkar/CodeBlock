'use client';

import React from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack';

import Profile from './Profile';

const Dashboard = () => {
  return (
    <Box flexGrow={1} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Stack direction={'column'} alignItems={'center'} padding={2} width={'100%'}>
        <Profile/>
      </Stack>
    </Box>
  )
}

export default Dashboard