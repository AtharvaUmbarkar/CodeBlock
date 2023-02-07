/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import React, { useState } from 'react'

import {
  MdMenu,
  MdClose,
  MdLogin,
  MdAccountCircle,
  MdPersonAdd,
  MdLogout,
  MdLibraryBooks,
  MdInfoOutline
} from 'react-icons/md'

interface NavProps {
  toggleScroll: () => void,
}

const NavBar: React.FC<NavProps> = ({ toggleScroll }) => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = (): void => {
    setNavOpen((navOpen) => !navOpen);
    toggleScroll();
  }

  return (
    <div className='sticky top-0 w-full lg:w-max flex flex-row lg:flex-col bg-white'>
      <header className='w-full flex flex-row items-center border-b border-solid border-blue-700 py-1.5 md:pb-2 lg:border-r lg:border-solid lg:border-blue-700'>

        <div className='self-stretch aspect-square my-1 mx-2 lg:hidden' onClick={toggleNav}>
          {navOpen ?
            <MdClose className='h-8 md:h-10 w-auto' />
            :
            <MdMenu className='h-8 md:h-10 w-auto' />
          }
        </div>

        <Link href={'/'} className='w-max flex flex-row flex-grow items-center justify-start mx-4 space-x-2 font-semibold lg:py-2 cursor-pointer'>
          <img className='h-8 md:h-10' src="./icons/code-block-solid-accent.svg" alt="icon-not-found" />
          <h1 className='w-fit text-3xl md:text-4xl'>Code<span className='text-blue-500'>Block</span></h1>
        </Link>

        <nav className={(navOpen ? 'block' : 'hidden') + ' lg:block w-full absolute h-navbar backdrop-blur-sm top-full text-base lg:text-lg list-none'}>
          <ul className='w-1/2 md:w-1/3 lg:w-full h-full flex flex-col bg-white p-1 divide-y-2 divide-blue-900 divide-opacity-20 overflow-y-auto border-r border-solid border-blue-700'>
            <li className='pt-0'>
              <Link href={'/register'} className='flex flex-row items-center cursor-pointer px-2 py-3 rounded-sm hover:bg-blue-200'>
                {/* <div className='self-stretch w-1 bg-blue-900'></div> */}
                <div className='text-blue-600 text-xl lg:text-2xl'><MdPersonAdd /></div>
                <div className='flex-grow mx-1 md:mx-2'>Register</div>
              </Link>
            </li>
            <li className='pt-0'>
              <Link href={'/login'} className='flex flex-row items-center cursor-pointer px-2 py-3 rounded-sm hover:bg-blue-200'>
                {/* <div className='self-stretch w-1 bg-blue-900'></div> */}
                <div className='text-blue-600 text-xl lg:text-2xl'><MdLogin /></div>
                <div className='flex-grow mx-1 md:mx-2'>Login</div>
              </Link>
            </li>
            <li className='pt-0'>
              <Link href={'/examples'} className='flex flex-row items-center cursor-pointer px-2 py-3 rounded-sm hover:bg-blue-200'>
                {/* <div className='self-stretch w-1 bg-blue-900'></div> */}
                <div className='text-blue-600 text-xl lg:text-2xl'><MdLibraryBooks /></div>
                <div className='flex-grow mx-1 md:mx-2'>Examples</div>
              </Link>
            </li>
            <li className='pt-0 justify-start'>
              <Link href={'/about'} className='flex flex-row items-center cursor-pointer px-2 py-3 rounded-sm hover:bg-blue-200'>
                {/* <div className='self-stretch w-1 bg-blue-900'></div> */}
                <div className='text-blue-600 text-xl lg:text-2xl'><MdInfoOutline /></div>
                <div className='flex-grow mx-1 md:mx-2'>About</div>
              </Link>
            </li>
          </ul>
        </nav>

      </header>
    </div>
  )
}

export default NavBar