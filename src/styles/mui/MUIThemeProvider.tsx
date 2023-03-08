'use client';

import React from 'react'

import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';

import CodeBlockPalette from './palette';
import CodeBlockComponents from './components';
import CodeBlockTypography from './typography';
import CodeBlockBreakpoints from './breakpoints';

const theme = createTheme({
  palette: CodeBlockPalette,
  components: CodeBlockComponents,
  typography: CodeBlockTypography,
  breakpoints: CodeBlockBreakpoints,
})

const MUIThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default MUIThemeProvider