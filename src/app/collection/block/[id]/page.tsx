'use client';

import React, { useEffect, useState } from 'react';

import Editor, { useMonaco, Monaco, } from "@monaco-editor/react";

import { MdArrowForwardIos, MdEdit, MdKeyboardArrowDown } from 'react-icons/md';

import { Listbox, Switch } from '@headlessui/react';
import ReactModal from 'react-modal';

import { ThemesInterface, CodeDetailsInterface } from "@interfaces/interfaces";

import './CodeBlock.css'
import { useQuery } from 'react-query';

ReactModal.setAppElement('#next-root')

const fonts = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

const fetchThemes = async () => {
  const response = await fetch('/api/editor/themes/all').then((res) => res.json()).catch((error) => console.log(error));
  return response;
}

const fetchLanguages = async () => {
  const response = await fetch('/api/editor/languages/all').then((res) => res.json()).catch((error) => console.log(error));
  return response;
}

const CodeBlock = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    "code-title": '',
    "code-description": '',
    "code-source": '',
  })
  const [codeDetails, setCodeDetails] = useState<CodeDetailsInterface>({
    title: 'Some random title for an amazing code written in javascript',
    description: 'A very long description Lorem ipsum dolor sit amet consectetur, adipisicing elit. A dicta provident voluptas, necessitatibus maxime quidem deleniti corporis adipisci reprehenderit accusantium! A very long description Lorem ipsum dolor sit amet consectetur, adipisicing elit. A dicta provident voluptas, necessitatibus maxime quidem deleniti corporis adipisci reprehenderit accusantium!',
    source: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, nesciunt!',
    language: 'javascript',
    theme: 'vs-dark',
    themeLabel: 'vs-dark',
    code: '// some comment',
    editorOptions: {
      readOnly: false,
      autoIndent: 'advanced',
      cursorStyle: "line",
      mouseWheelZoom: false,
      wordWrap: 'on',
      minimap: { enabled: true },
      fontSize: 20,
    },
    dateCreated: Date.now(),
    dateModified: Date.now()
  })

  const {
    data: themes,
    error: themesError,
    isLoading: themesLoading,
  } = useQuery('fetch-themes', fetchThemes);

  const {
    data: languages,
    error: languageError,
    isLoading: languagesLoading,
  } = useQuery('fetch-languages', fetchLanguages);

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco && themes) {
      loadThemes(monaco, themes)
    }
  }, [themes, monaco])


  const toggleDetailModal = () => {
    handleEditDetailsCancel();
    setOpenModal(!openModal);
  }
  const loadThemes = (monaco: Monaco, themes: ThemesInterface) => {
    Object.keys(themes).map((theme) => {
      monaco.editor.defineTheme(theme, themes[theme].data);
    })
    // setTheme('Night-Owl');
    // setThemelabel('Night Owl')
    console.log('themes loaded');
  }
  const handleModalDetailsChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value, e.target.name);
    
    setModalDetails((modalDetails) => modalDetails = { ...modalDetails, [e.target.name]: e.target.value });
  }
  const handleThemeChange = (theme: string) => {
    setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, themeLabel: themes[theme].name });
    setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, theme: theme });
    console.log('theme changed');
  }
  const handlelanguageChange = (language: string) => {
    setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, language: language });
  }
  const handleCodeChange = (code: string | undefined) => {
    if (code) setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, code: code });
    else setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, code: '' })
  }
  const handleReadOnly = () => {
    setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, editorOptions: { ...codeDetails.editorOptions, readOnly: !codeDetails.editorOptions.readOnly } })
  }
  const handleFontChange = (font: number) => {
    setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, editorOptions: { ...codeDetails.editorOptions, fontSize: font } })
  }
  const handleAutoIndent = () => {
    if (codeDetails.editorOptions.autoIndent === 'advanced') setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, editorOptions: { ...codeDetails.editorOptions, autoIndent: 'none' } })
    if (codeDetails.editorOptions.autoIndent === 'none') setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, editorOptions: { ...codeDetails.editorOptions, autoIndent: 'advanced' } })
  }
  const handleMiniMap = () => {
    setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, editorOptions: { ...codeDetails.editorOptions, minimap: { enabled: !codeDetails.editorOptions.minimap?.enabled } } })
  }
  const handleCursorStyle = () => {
    if (codeDetails.editorOptions.cursorStyle === 'line') setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, editorOptions: { ...codeDetails.editorOptions, cursorStyle: 'block' } })
    if (codeDetails.editorOptions.cursorStyle === 'block') setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, editorOptions: { ...codeDetails.editorOptions, cursorStyle: 'line' } })
  }
  const handleMouseWheelZoom = () => {
    setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, editorOptions: { ...codeDetails.editorOptions, mouseWheelZoom: !codeDetails.editorOptions.mouseWheelZoom } })
  }
  const handleWordWrap = () => {
    if (codeDetails.editorOptions.wordWrap === 'on') setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, editorOptions: { ...codeDetails.editorOptions, wordWrap: 'off' } })
    if (codeDetails.editorOptions.wordWrap === 'off') setCodeDetails((codeDetails) => codeDetails = { ...codeDetails, editorOptions: { ...codeDetails.editorOptions, wordWrap: 'on' } })
  }

  const handleEditDetailsCancel = () => {
    setModalDetails((modalDetails) => modalDetails = {
      "code-title": codeDetails.title,
      "code-description": codeDetails.description,
      "code-source": codeDetails.source,
    })
    setOpenModal(false);
  }
  const handleEditDetailsDone = () => {
    setCodeDetails((codeDetails) => codeDetails = {
      ...codeDetails,
      title: modalDetails['code-title'],
      description: modalDetails['code-description'],
      source: modalDetails['code-source'],
    })
    setOpenModal(false);
  }




  // const handleEditorMount = (editor: MonacoEditor.IStandaloneCodeEditor, monaco: Monaco) => {
  //   setTheme('Night-Owl');
  // }

  return (
    <div id='code-block' className='flex flex-col items-center flex-grow lg:min-h-screen w-full bg-white relative'>
      <div className='flex flex-col items-center w-[95%]'>

        <div className='self-start flex flex-row items-center mt-6 mb-2 w-full'>
          <div onClick={() => setOpenModal(true)} className='text-primary bg-white text-3xl h-auto aspect-square border-2 border-solid border-primary p-0 flex flex-row items-center justify-center rounded-md cursor-pointer'>
            <MdEdit className='text-2xl m-0.5' />
          </div>
          <div className='self-start font-medium flex-grow text-2xl lg:text-3xl text-ellipsis bg-white px-3'>
            {codeDetails.title}
          </div>
        </div>

        <div className='text-lg my-1 self-start font-semibold'>
          Source:{' '}
          <span className='font-normal'>{codeDetails.source}</span>
        </div>

        <div className='text-lg mt-2 mb-4 self-start'>
          {codeDetails.description}
        </div>

        <ReactModal
          isOpen={openModal}
          onRequestClose={toggleDetailModal}
          shouldCloseOnEsc={true}
          parentSelector={() => document.querySelector('#code-block') as HTMLElement}
          shouldCloseOnOverlayClick={true}
          overlayClassName='modal-overlay'
          bodyOpenClassName='modal-on-body'
          className='modal-content'
        >
          <div className='flex flex-col my-4 mx-4'>
            <div className='text-3xl self-center font-semibold'>Edit Details</div>
            <div className='flex flex-col gap-x-2 my-4'>
              <label htmlFor="code-title" className='text-xl font-semibold text-secondary-darker cursor-pointer'>Title*</label>
              <input
                id='code-title'
                name='code-title'
                type="text"
                onChange={(e) => handleModalDetailsChange(e)}
                value={modalDetails['code-title']}
                className='p-2 outline-none border-2 border-solid my-2 border-secondary focus:border-accent rounded-sm text-lg'
              />
            </div>
            <div className='flex flex-col gap-x-2 my-2'>
              <label htmlFor="code-source" className='text-xl font-semibold text-secondary-darker cursor-pointer'>Source</label>
              <input
                id='code-source'
                name='code-source'
                type="text"
                onChange={(e) => handleModalDetailsChange(e)}
                value={modalDetails['code-source']}
                className='p-2 outline-none border-2 border-solid my-2 border-secondary focus:border-accent rounded-sm text-lg'
              />
            </div>
            <div className='flex flex-col gap-x-2 my-2'>
              <label htmlFor="code-description" className='text-xl font-semibold text-secondary-darker cursor-pointer'>Description</label>
              <textarea
                id='code-description'
                name='code-description'
                onChange={(e) => handleModalDetailsChange(e)}
                value={modalDetails['code-description']}
                className='max-h-72 min-h-[6rem] p-2 outline-none border-2 border-solid my-2 border-secondary focus:border-accent rounded-sm text-lg'
              />
            </div>
            <div className='flex flex-row gap-2 my-3 justify-center'>
              <button type='button' onClick={handleEditDetailsCancel} className='py-2 px-4 bg-primary text-white font-medium hover:bg-secondary rounded-md'>Cancel</button>
              <button type='button' onClick={handleEditDetailsDone} className='py-2 px-4 bg-primary text-white font-medium hover:bg-secondary rounded-md'>Done</button>
            </div>
          </div>
        </ReactModal>

        <div className=' w-full text-base md:text-lg text-black mb-4 bg-accent-op-200 py-1 px-2 flex flex-col items-center'>
          <div className='flex flex-col xl:flex-row items-start xl:items-center gap-x-4 w-full max-w-sm lg:max-w-md xl:max-w-none'>

            <Listbox as={'div'} className={'flex flex-row items-center justify-between xl:justify-start w-full xl:w-auto my-1'}>
              <Listbox.Label className={'mr-2 font-medium'}>Language:</Listbox.Label>
              <div className='flex flex-col relative w-max'>
                <Listbox.Button className={'bg-white border-2 flex flex-row items-center justify-between text-center pl-4 font-medium border-solid border-accent hover:border-primary px-1 py-1 rounded-md w-40 md:w-44'}>
                  <div className='flex-grow'>{codeDetails.language}</div>
                  <MdKeyboardArrowDown />
                </Listbox.Button>
                {languages &&
                  <Listbox.Options tabIndex={0} className='absolute top-full z-10 bg-white mt-1 cursor-pointer w-40 md:w-44 text-center overflow-y-scroll h-96'>
                    {Object.keys(languages).map((l: string) => (
                      <Listbox.Option
                        key={l}
                        value={languages[l]}
                        className={(codeDetails.language == l ? 'bg-primary text-white' : 'hover:bg-accent') + ' py-1.5 px-1'}
                        onClick={() => handlelanguageChange(l)}
                      >
                        {l}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                }
              </div>
            </Listbox>

            <Listbox as={'div'} className={'flex flex-row items-center justify-between xl:justify-start w-full xl:w-auto my-1'}>
              <Listbox.Label className={'mr-2 font-medium'}>Theme:</Listbox.Label>
              <div className='flex flex-col relative w-max'>
                <Listbox.Button className={'bg-white border-2 flex flex-row items-center justify-between text-center pl-4 font-medium border-solid border-accent hover:border-primary px-1 py-1 rounded-md w-64 md:w-72'}>
                  <div className='flex-grow'>{codeDetails.themeLabel}</div>
                  <MdKeyboardArrowDown />
                </Listbox.Button>
                {themes &&
                  <Listbox.Options tabIndex={0} className='absolute top-full z-10 bg-white mt-1 cursor-pointer w-64 md:w-72 text-center overflow-y-scroll h-96'>
                    {Object.keys(themes).map((t: string) => (
                      <Listbox.Option
                        key={t}
                        value={themes[t].name}
                        className={(codeDetails.theme == t ? 'bg-primary text-white' : 'hover:bg-accent') + ' py-1.5 px-1'}
                        onClick={() => handleThemeChange(t)}
                      >
                        {themes[t].name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                }
              </div>
            </Listbox>

            <Listbox as={'div'} className={'flex flex-row items-center justify-between xl:justify-start w-full xl:w-auto my-1'}>
              <Listbox.Label className={'mr-2 font-medium'}>Font:</Listbox.Label>
              <div className='flex flex-col relative w-max'>
                <Listbox.Button className={'bg-white border-2 flex flex-row items-center justify-between text-center pl-4 font-medium border-solid border-accent hover:border-primary px-1 py-1 rounded-md w-16'}>
                  <div className='flex-grow'>{codeDetails.editorOptions.fontSize}</div>
                  <MdKeyboardArrowDown />
                </Listbox.Button>
                {fonts &&
                  <Listbox.Options tabIndex={0} className='absolute top-full z-10 bg-white mt-1 cursor-pointer w-16 text-center overflow-y-scroll h-96'>
                    {fonts.map((f: number) => (
                      <Listbox.Option
                        key={f}
                        value={f}
                        className={(codeDetails.editorOptions.fontSize == f ? 'bg-primary text-white' : 'hover:bg-accent') + ' py-1.5 px-1'}
                        onClick={() => handleFontChange(f)}
                      >
                        {f}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                }
              </div>
            </Listbox>

          </div>
        </div>

        <Editor
          className='h-[48rem]'
          onChange={handleCodeChange}
          defaultValue={codeDetails.code}
          language={codeDetails.language}
          theme={codeDetails.theme}
          // onMount={handleEditorMount}
          options={codeDetails.editorOptions}
        />

        <div className='w-full flex flex-col md:flex-row text-lg my-4 items-start'>
          <Switch.Group as={'div'} className={'w-fit grid text-lg self-center md:self-auto md:items:center'}>
            <div className="flex flex-row justify-between w-64 items-center">
              <Switch.Label className="mr-4">Read Only</Switch.Label>
              <Switch
                checked={codeDetails.editorOptions.readOnly}
                onChange={handleReadOnly}
                className={`${codeDetails.editorOptions.readOnly ? 'bg-primary' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
              >
                <span
                  className={`${codeDetails.editorOptions.readOnly ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
            <div className="flex flex-row justify-between w-64 items-center">
              <Switch.Label className="mr-4">Auto Indent</Switch.Label>
              <Switch
                checked={codeDetails.editorOptions.autoIndent === 'advanced'}
                onChange={handleAutoIndent}
                className={`${codeDetails.editorOptions.autoIndent === 'advanced' ? 'bg-primary' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
              >
                <span
                  className={`${codeDetails.editorOptions.autoIndent === 'advanced' ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
            <div className="flex flex-row justify-between w-64 items-center">
              <Switch.Label className="mr-4">Cursor Block</Switch.Label>
              <Switch
                checked={codeDetails.editorOptions.cursorStyle === 'block'}
                onChange={handleCursorStyle}
                className={`${codeDetails.editorOptions.cursorStyle === 'block' ? 'bg-primary' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
              >
                <span
                  className={`${codeDetails.editorOptions.cursorStyle === 'block' ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
            <div className="flex flex-row justify-between w-64 items-center">
              <Switch.Label className="mr-4">Mouse Wheel Zoom</Switch.Label>
              <Switch
                checked={codeDetails.editorOptions.mouseWheelZoom}
                onChange={handleMouseWheelZoom}
                className={`${codeDetails.editorOptions.mouseWheelZoom ? 'bg-primary' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
              >
                <span
                  className={`${codeDetails.editorOptions.mouseWheelZoom ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
            <div className="flex flex-row justify-between w-64 items-center">
              <Switch.Label className="mr-4">Word Wrap</Switch.Label>
              <Switch
                checked={codeDetails.editorOptions.wordWrap === 'on'}
                onChange={handleWordWrap}
                className={`${codeDetails.editorOptions.wordWrap === 'on' ? 'bg-primary' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
              >
                <span
                  className={`${codeDetails.editorOptions.wordWrap === 'on' ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
            <div className="flex flex-row justify-between w-64 items-center">
              <Switch.Label className="mr-4">MiniMap</Switch.Label>
              <Switch
                checked={codeDetails.editorOptions.minimap?.enabled}
                onChange={handleMiniMap}
                className={`${codeDetails.editorOptions.minimap?.enabled ? 'bg-primary' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
              >
                <span
                  className={`${codeDetails.editorOptions.minimap?.enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </Switch.Group>

          <div className='flex flex-row flex-grow gap-2 self-center md:self-auto md:items-center justify-end my-8 md:my-0'>
            <div className='px-2 py-2 w-24 cursor-pointer flex flex-row items-center justify-center bg-accent-dark hover:bg-primary text-white text-base md:text-lg rounded-sm'>Save</div>
            <div className='px-2 py-2 w-28 cursor-pointer flex flex-row items-center justify-center bg-accent-dark hover:bg-primary text-white text-base md:text-lg rounded-sm'>Finish <MdArrowForwardIos className='ml-2' /></div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CodeBlock