'use client';

import React, { useContext, useState } from 'react'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
// import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import Link from 'next/link';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism';
import SnackbarContext from 'src/context/SnackbarContext';

interface ThemesInterface {
  [key: string]: {
    [key: string]: React.CSSProperties
  }
};

const fontSizes = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

const Record = () => {
  const [code, setCode] = useState<string>(`const a = 10;`);

  const [canEdit, setCanEdit] = useState(true);
  const [wrapLines, setWrapLines] = useState(false);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('materialDark');

  const [title, setTitle] = useState('default title');
  const [description, setDescription] = useState('default description');

  const { showSnackbar } = useContext(SnackbarContext);

  return (
    <Box component={'div'} flexGrow={1} width={'10%'}>
      <Stack direction={'column'} alignItems={'center'} width={'100%'}>
        <Stack direction={'row'} justifyContent={'space-between'} alignSelf={'stretch'} sx={{ margin: 2 }}>
          <Link href={'/collection'}>
            <Button variant='outlined' startIcon={<ArrowBackIosNewIcon />} >Collection</Button>
          </Link>
        </Stack>

        <Stack direction={'column'} gap={2} width={'90%'} marginTop={2} marginBottom={8}>
          <ButtonGroup disableElevation variant={'outlined'} sx={{ alignSelf: 'end' }}>
            <Button variant={canEdit ? 'outlined' : 'contained'} onClick={() => setCanEdit(!canEdit)}>{canEdit ? <LockOpenIcon /> : <LockIcon />}</Button>
            <Button onClick={() => { navigator.clipboard.writeText(code); showSnackbar('Copied to Clipboard', 3000, 'success'); }}><ContentCopyIcon /></Button>
            {/* <Button><EditIcon /></Button> */}
            <Button><DeleteIcon /></Button>
            <Button startIcon={<SaveIcon />}>Save</Button>
          </ButtonGroup>

          <TextField
            placeholder='Title'
            hiddenLabel
            variant='filled'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{
              readOnly: !canEdit, 
              // sx: {
              //   backgroundColor: 'transparent'
              // }
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            multiline
          />

          <TextField
            placeholder='Description'
            hiddenLabel
            variant='filled'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{ readOnly: !canEdit, }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            multiline
          />

          <Stack direction={{ xs: 'column', xl: 'row' }} alignSelf='stretch' columnGap={1} rowGap={2} marginTop={4}>
            <TextField
              label='Language'
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              InputLabelProps={{ shrink: true }}
              select
              fullWidth
            >
              {SyntaxHighlighter.supportedLanguages.map((lang, i) => {
                return (
                  <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                )
              })}
            </TextField>
            <TextField
              label='Theme'
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              InputLabelProps={{ shrink: true }}
              select
              fullWidth
            >
              {Object.keys(themes).map((t, i) => {
                return (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                )
              })}
            </TextField>
            <TextField
              label='FontSize'
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              InputLabelProps={{ shrink: true }}
              select
              fullWidth
              type={'number'}
            >
              {fontSizes.map((f, i) => {
                return (
                  <MenuItem key={f} value={f}>{f}</MenuItem>
                )
              })}
            </TextField>
          </Stack>

          <Stack direction={{ xs: 'column', xl: 'row' }} alignSelf='stretch' columnGap={1}>
            <FormControlLabel labelPlacement='end' control={<Checkbox checked={wrapLines} onClick={() => setWrapLines(!wrapLines)} inputProps={{ "aria-label": 'wrap lines' }} />} label='wrap lines' />
            <FormControlLabel labelPlacement='end' control={<Checkbox checked={lineNumbers} onClick={() => setLineNumbers(!lineNumbers)} inputProps={{ "aria-label": 'line numbers' }} />} label='line numbers' />
          </Stack>

          <SyntaxHighlighter
            language={language}
            style={(themes as ThemesInterface)[theme]}
            showLineNumbers={lineNumbers}
            wrapLines
            wrapLongLines={wrapLines}
            className='tw-h-[36rem] tw-w-full tw-overflow-auto'
            codeTagProps={{ style: { fontSize: fontSize } }}
          >
            {code}
          </SyntaxHighlighter>

          <TextField
            hiddenLabel
            placeholder='Code'
            InputProps={{ readOnly: !canEdit }}
            InputLabelProps={{ shrink: true, }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
            multiline
            rows={20}
          />
        </Stack>

      </Stack>
    </Box>
  )
}

export default Record