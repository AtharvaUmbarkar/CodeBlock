'use client';

import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface DeleteDialogInterface {
  modalOpen: boolean,
  handleCloseModal: () => void,
  modalTitle: string,
}

const DeleteDialog = ({ modalOpen, modalTitle, handleCloseModal }: DeleteDialogInterface) => {
  return (
    <Dialog open={modalOpen} onClose={handleCloseModal} keepMounted>
      <Stack width={{ xs: 250, md: 350, lg: 400 }}>
        <DialogTitle variant='h6'>
          Delete the following record?
        </DialogTitle>
        <DialogContent>
          <Typography>
            {modalTitle}
          </Typography>
        </DialogContent>
        <DialogActions >
          <Button disableElevation variant='contained' size='small' onClick={handleCloseModal}><ArrowBackIcon /></Button>
          <Button disableElevation variant='contained' size='small' startIcon={<DeleteIcon />}>Delete</Button>
        </DialogActions>
      </Stack>
    </Dialog>
  )
}

export default DeleteDialog