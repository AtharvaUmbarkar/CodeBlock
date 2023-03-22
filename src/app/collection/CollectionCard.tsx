import React, { useContext } from 'react'

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';

import DeleteIcon from '@mui/icons-material/Delete'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import SnackbarContext from 'src/context/SnackbarContext';

interface CollectionCardInterface {
  title: string,
  description: string,
  favourite: boolean,
  lastModified: string,
  language: string,
  openModal: (title: string) => void,
}


const CollectionCard = ({ title, description, lastModified, favourite, language, openModal }: CollectionCardInterface) => {
  const { showSnackbar } = useContext(SnackbarContext);
  return (
    <Grid2 xs={12} md={6} lg={4} disableEqualOverflow>
      <Card sx={{ backgroundColor: 'white.main', height: 240 }}>
        <CardContent sx={{ width: '100%' }}>
          <Typography
            variant='h6'
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            whiteSpace={'nowrap'}
            maxWidth={{ xs: 300, sm: 500, md: 500, lg: 500, xl: 500 }}
            style={{ WebkitLineClamp: 1, display: '--webkit-box !important', WebkitBoxOrient: 'vertical' }}
          >
            {title}
          </Typography>
          <Typography
            variant='subtitle2'
            height={42}
            marginY={1}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
            style={{ WebkitLineClamp: 2, display: '--webkit-box !important', WebkitBoxOrient: 'vertical' }}
          >
            {description}
          </Typography>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Chip label={language} color='success' variant='outlined' />
            <Stack direction={'column'} alignItems={'end'} marginBottom={1}>
              <Typography variant='caption'>Last Modified</Typography>
              <Typography variant='body2'>{lastModified}</Typography>
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
            <IconButton onClick={() => openModal(title)}>
              <DeleteIcon />
            </IconButton>
            <ButtonGroup variant='outlined' size='small' disableElevation>
              <Button onClick={() => showSnackbar('Copied to Clipboard', 2000, 'success')}><ContentCopyIcon /></Button>
              <Button>{favourite ? <StarIcon /> : <StarOutlineIcon />}</Button>
              <Button><EditIcon /></Button>
            </ButtonGroup>
          </Stack>
        </CardActions>
      </Card>
    </Grid2>
  )
}

export default CollectionCard