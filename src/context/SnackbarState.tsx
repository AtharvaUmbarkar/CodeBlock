import React, { useState } from 'react'

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import SnackbarContext from './SnackbarContext'
import Alert, { AlertColor } from '@mui/material/Alert';


const SnackbarState = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('default message');
  const [variant, setVariant] = useState('success');
  const [duration, setDuration] = useState(2000);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );


  const showSnackbar = (message: string, duration: number, variant: string) => {
    setMessage(message);
    setVariant(variant);
    setDuration(duration);
    setOpen(true);
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert onClose={handleClose} severity={variant as AlertColor} sx={{ minWidth: 300 }}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  )
}

export default SnackbarState