/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react'
import Link from 'next/link';
import { usePathname, useRouter, useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation';
import { getSession, useSession } from 'next-auth/react';

import {
  MdMenu,
  MdClose,
  MdLogin,
  MdAccountCircle,
  MdPersonAdd,
  MdLogout,
  MdLibraryBooks,
  MdInfoOutline,
  MdHome,
  MdDashboard,
  MdStickyNote2,
} from 'react-icons/md'

interface NavProps {
  toggleScroll: () => void,
}

const NavBar = ({ toggleScroll }: NavProps) => {
  const [navOpen, setNavOpen] = useState(false);
  const path = useSelectedLayoutSegments().filter((p) => { return p[0] != '(' });

  const { data: session } = useSession();

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

        <Link
          href={'/'}
          className='w-max flex flex-row flex-grow items-center justify-start mx-4 space-x-2 font-semibold lg:py-2 cursor-pointer'
          onClick={() => { if (navOpen) toggleNav() }}
        >
          <img className='h-8 md:h-10' src="/icons/code-block-solid-accent.svg" alt="icon-not-found" />
          <h1 className='w-fit text-3xl md:text-4xl'>Code<span className='text-blue-500'>Block</span></h1>
        </Link>

        <nav className={(navOpen ? 'block' : 'hidden') + ' lg:block w-full absolute h-navbar backdrop-blur-sm top-full text-base lg:text-lg list-none'}>
          <ul className='w-1/2 md:w-1/3 lg:w-full h-full flex flex-col bg-white divide-y-2 divide-blue-900 divide-opacity-10 overflow-y-auto border-r border-solid border-blue-700'>
            <li className='pt-0'>
              <Link
                href={'/'}
                className={
                  'flex flex-row items-center cursor-pointer px-2 py-3 '
                  + (!path.length ? ' font-semibold bg-blue-600 text-white' : ' hover:bg-blue-200')
                }
                onClick={toggleNav}
              >
                <div className={
                  'text-xl lg:text-2xl'
                  + (!path.length ? ' font-normal text-white' : ' text-blue-600')
                }
                >
                  <MdHome />
                </div>
                <div className='flex-grow mx-1 md:mx-2'>Home</div>
              </Link>
            </li>
            {(!session) &&
              <li className='pt-0'>
                <Link
                  href={'/login'}
                  className={
                    'flex flex-row items-center cursor-pointer px-2 py-3 '
                    + (path[0] === 'login' ? ' font-semibold bg-blue-600 text-white' : ' hover:bg-blue-200')
                  }
                  onClick={toggleNav}
                >
                  <div className={
                    'text-xl lg:text-2xl'
                    + (path[0] === 'login' ? ' font-normal text-white' : ' text-blue-600')
                  }
                  >
                    <MdLogin />
                  </div>
                  <div className='flex-grow mx-1 md:mx-2'>Login</div>
                </Link>
              </li>
            }
            {(session) &&
              <li className='pt-0'>
                <Link
                  href={'/dashboard'}
                  className={
                    'flex flex-row items-center cursor-pointer px-2 py-3 '
                    + (path[0] === 'dashboard' ? ' font-semibold bg-blue-600 text-white' : ' hover:bg-blue-200')
                  }
                  onClick={toggleNav}
                >
                  <div className={
                    'text-xl lg:text-2xl'
                    + (path[0] === 'dashboard' ? ' font-normal text-white' : ' text-blue-600')
                  }
                  >
                    <MdDashboard />
                  </div>
                  <div className='flex-grow mx-1 md:mx-2'>Dashboard</div>
                </Link>
              </li>
            }
            {(session) &&
              <li className='pt-0 justify-start'>
                <Link
                  href={'/collection'}
                  className={
                    'flex flex-row items-center cursor-pointer px-2 py-3 '
                    + (path[0] === 'collection' ? ' font-semibold bg-blue-600 text-white' : ' hover:bg-blue-200')
                  }
                  onClick={toggleNav}
                >
                  <div className={
                    'text-xl lg:text-2xl'
                    + (path[0] === 'collection' ? ' font-normal text-white' : ' text-blue-600')
                  }
                  >
                    <MdLibraryBooks />
                  </div>
                  <div className='flex-grow mx-1 md:mx-2'>Collection</div>
                </Link>
              </li>
            }
            <li className='pt-0'>
              <Link
                href={'/examples'}
                className={
                  'flex flex-row items-center cursor-pointer px-2 py-3 '
                  + (path[0] === 'examples' ? ' font-semibold bg-blue-600 text-white' : ' hover:bg-blue-200')
                }
                onClick={toggleNav}
              >
                <div className={
                  'text-xl lg:text-2xl'
                  + (path[0] === 'examples' ? ' font-normal text-white' : ' text-blue-600')
                }
                >
                  <MdStickyNote2 />
                </div>
                <div className='flex-grow mx-1 md:mx-2'>Examples</div>
              </Link>
            </li>
            <li className='pt-0 justify-start'>
              <Link
                href={'/about'}
                className={
                  'flex flex-row items-center cursor-pointer px-2 py-3 '
                  + (path[0] === 'about' ? ' font-semibold bg-blue-600 text-white' : ' hover:bg-blue-200')
                }
                onClick={toggleNav}
              >
                <div className={
                  'text-xl lg:text-2xl'
                  + (path[0] === 'about' ? ' font-normal text-white' : ' text-blue-600')
                }
                >
                  <MdInfoOutline />
                </div>
                <div className='flex-grow mx-1 md:mx-2'>About</div>
              </Link>
            </li>

            <li className='flex-grow'></li>

            {(session) &&
              <li className='pt-0 justify-self-end'>
                <Link
                  href={'/logout'}
                  className={
                    'flex flex-row items-center cursor-pointer px-2 py-3 '
                    + (path[0] === 'logout' ? ' font-semibold bg-blue-600 text-white' : ' hover:bg-blue-200')
                  }
                  onClick={toggleNav}
                >
                  <div className={
                    'text-xl lg:text-2xl'
                    + (path[0] === 'logout' ? ' font-normal text-white' : ' text-blue-600')
                  }
                  >
                    <MdLogout />
                  </div>
                  <div className='flex-grow mx-1 md:mx-2'>Logout</div>
                </Link>
              </li>
            }
          </ul>
        </nav>

      </header>
    </div>
  )
}

export default NavBar