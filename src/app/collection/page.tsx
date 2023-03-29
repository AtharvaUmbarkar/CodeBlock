'use client';

import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack';
import SearchBar from './SearchBar';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import CollectionCard from './CollectionCard';

import SortIcon from '@mui/icons-material/Sort';

import data from './data';
import DeleteDialog from './DeleteDialog';

const sortOptions = [
  'last modified',
  'date created',
  'name',
  'language',
]

const Collection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [sortAnchor, setSortAnchor] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const sortOpen = Boolean(sortAnchor);

  const handleOpenModal = (title: string) => {
    setModalTitle(title);
    setModalOpen(true);
  }

  const handleSortOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchor(event.currentTarget);
  }

  const handleCloseSort = () => {
    setSortAnchor(null);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearchQuery = (query: string): void => {
    setSearchQuery(query);
  }

  return (
    <Box flexGrow={1} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <DeleteDialog modalOpen={modalOpen} modalTitle={modalTitle} handleCloseModal={handleCloseModal} />
      <Stack direction={'column'} alignItems={'center'} width={'90%'} paddingY={3}>
        <SearchBar searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />
        <Stack direction={'row'} alignSelf={'end'} marginY={2} alignItems={'center'}>
          <SortIcon />
          <Typography variant='subtitle1' marginRight={1} marginLeft={0.5}>Sort By:</Typography>
          <Button variant={'outlined'} size={'small'} sx={{ minWidth: 150 }} disableElevation onClick={handleSortOpen}>{sortBy}</Button>
          <Menu
            id="basic-menu"
            anchorEl={sortAnchor}
            open={sortOpen}
            onClose={handleCloseSort}
            MenuListProps={{
              'aria-labelledby': 'sort-button',
            }}
          >
            {sortOptions.map((option, i) => {
              return (
                <MenuItem sx={{ minWidth: 150 }} selected={option === sortBy} key={option} onClick={() => { setSortBy(option); handleCloseSort(); }}>{option}</MenuItem>
              )
            })}
          </Menu>
        </Stack>
        <Grid2 container width={'100%'} spacing={2} disableEqualOverflow>
          {data.map((record, i) => {
            return (
              <CollectionCard key={i} {...record} openModal={handleOpenModal} />
            )
          })}
        </Grid2>
        <Pagination page={currentPage} onChange={(e, v) => setCurrentPage(v)} count={10} variant="text" shape="rounded" color='primary' size='large' sx={{ marginTop: 2 }} />
      </Stack>
    </Box>
  )
}

export default Collection