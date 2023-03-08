'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

import demoCode from '@/public/home/demo-code-2.png'

import Chip from '@mui/material/Chip';
import Link from 'next/link';
import Button from '@mui/material/Button';

const Home = () => {
  const { data: session } = useSession();
  return (
    <div className='tw-grid tw-place-items-center tw-place-content-start tw-flex-grow lg:tw-min-h-screen code-block-bg'>
      <div className='tw-flex tw-flex-col tw-flex-grow tw-items-center tw-w-3/4'>
        <h1 className='tw-text-4xl md:tw-text-5xl lg:tw-text-6xl tw-text-black-main tw-font-bold tw-my-8 lg:tw-my-12 tw-text-center'>Can&apos;t find some code you saved a while back ?</h1>
        <Image className='tw-h-auto tw-w-full md:tw-w-3/4 lg:tw-w-2/3' src={demoCode} alt='demo-code-image' placeholder='blur' />
        <section>
          <h1 className='tw-font-semibold tw-my-8 lg:tw-my-12 tw-text-black-light tw-text-2xl lg:tw-text-3xl tw-text-center'>
            CodeBlock lets you
            <Chip label='create' variant='outlined' sx={{ color: 'black.light', backgroundColor: 'white.main', fontSize: { xs: 20, lg: 24 }, padding: 0.5, marginInline: 1 }} />
            {/* <span className='text-primary-main text-opacity-100 font-bold'> create </span> */}
            /
            <Chip label='edit' variant='outlined' sx={{ color: 'black.light', backgroundColor: 'white.main', fontSize: { xs: 20, lg: 24 }, padding: 0.5, marginInline: 1 }} />
            {/* <span className='text-primary-main text-opacity-100 font-bold'> test </span> */}
            /
            <Chip label='manage' variant='outlined' sx={{ color: 'black.light', backgroundColor: 'white.main', fontSize: { xs: 20, lg: 24 }, padding: 0.5, marginInline: 1 }} />
            {/* <span className='text-primary-main text-opacity-100 font-bold'> manage </span> */}
            your indispensable code snippets, to allow easy access for coding and sharing purposes.
          </h1>
        </section>
        <div className='tw-flex tw-flex-row tw-flex-wrap tw-text-xl tw-gap-2 tw-items-center tw-justify-center tw-mb-8'>
          {(!session) &&
            <Link href={'/login'}>
              <Button variant='contained' color='primary' sx={{ paddingBlock: 1, paddingInline: 2, fontSize: 16 }}>Login to Get Started</Button>
            </Link>
            // <Link href={'/login'} className='my-1 py-4 px-1 w-52 md:w-60 text-xl bg-primary-main text-black-main font-semibold hover:bg-primary-dark rounded-md text-center'>Login to Get Started</Link>
          }
        </div>
      </div>
    </div>
  )
}

export default Home;
