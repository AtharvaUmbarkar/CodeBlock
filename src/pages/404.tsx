import React from 'react'
import Link from 'next/link'
import '@/styles/globals.css'

const Error404 = () => {
  return (
    <div className='grid place-items-center bg-white h-[100vh] w-[100vw]'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-row items-center my-8'>
          <h1 className='text-blue-500 px-2 text-3xl text-center md:text-4xl lg:text-5xl border-r-2 border-solid border-blue-300'>404</h1>
          <div className='text-black text-3xl text-center md:text-4xl lg:text-5xl mx-4'>Page Not Found</div>
        </div>
        <Link href={'/'} className='daisy-btn bg-blue-500 border-none hover:bg-blue-400 text-white'>Return to Home</Link>
      </div>
    </div>
  )
}

export default Error404