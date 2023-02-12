'use client';

import React, { useEffect, useState } from 'react'

import useSWR from 'swr'

import Editor, { useMonaco, loader, Monaco, } from "@monaco-editor/react";

const fetchThemes = async () => {
  const response = await fetch('/api/editor-themes/all').then((res) => res.json()).catch((error) => console.log(error));
  return response;
}

const CodeBlock = () => {
  const [theme, setTheme] = useState('vs-dark')
  const { data: themes, error, isLoading } = useSWR('fetch-themes', fetchThemes);
  const monaco = useMonaco();


  useEffect(() => {
    if (monaco && themes) {
      Object.keys(themes).map((t) => {
        monaco.editor.defineTheme(t, themes[t]);
      })
      console.log('themes loaded');
    }
  }, [themes, monaco])

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    console.log('theme changed');
  }

  return (
    <div className='flex flex-col flex-grow lg:min-h-screen w-full lg:w-auto bg-white'>
      <Editor
        // className=''
        height="80vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        // language='cpp'
        theme={theme}

      />
      <div className='daisy-btn' onClick={() => handleThemeChange('vs-dark')}>vs dark</div>
      <div className='daisy-btn' onClick={() => handleThemeChange('Amy')}>Amy</div>
      <div className='daisy-btn' onClick={() => handleThemeChange('Dracula')}>Dracula</div>
    </div>
  )
}

export default CodeBlock