import React from 'react'

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

const SearchBar = ({ searchQuery, handleSearchQuery }: { searchQuery: string, handleSearchQuery: (query: string) => void }) => {
  return (
    <Stack direction={'row'} alignItems={'center'} width={'100%'}>
      <TextField
        hiddenLabel
        placeholder='search'
        fullWidth
        value={searchQuery}
        onChange={(e) => {
          handleSearchQuery(e.target.value);
        }}
        sx={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        InputProps={{
          sx: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }
        }}
        inputProps={{
          className:'tw-p-2 md:tw-p-3 lg:tw-p-4',
        }}
      />
      <Button
        variant='contained'
        disableElevation
        sx={{
          alignSelf: 'stretch',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <Stack direction={'row'} alignItems={'center'} gap={0.5}>
          <SearchIcon />
          <Typography variant='button' display={{ xs: 'none', md: 'block' }}>Search</Typography>
        </Stack>
      </Button>
    </Stack>
  )
}

export default SearchBar