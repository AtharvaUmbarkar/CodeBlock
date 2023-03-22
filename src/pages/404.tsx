import React from 'react'
import Link from 'next/link'

import '@/styles/base.css'
import '@/styles/globals.css'

const Error404 = () => {
  return (
    <div className='tw-grid tw-place-items-center tw-bg-white tw-h-[100vh] tw-w-[100vw]'>
      <div className='tw-flex tw-flex-col tw-items-center'>
        <div className='tw-flex tw-flex-row tw-items-center tw-mb-12'>
          <h1 className='tw-text-primary-main tw-font-bold tw-px-2 tw-text-4xl tw-text-center lg:tw-text-5xl tw-border-r-2 tw-border-solid tw-border-primary-light'>404</h1>
          <div className='tw-text-black tw-text-4xl tw-text-center lg:tw-text-5xl tw-mx-4'>Page Not Found</div>
        </div>
        <Link href={'/'} className='tw-p-3 tw-text-sm lg:tw-text-base tw-rounded-md focus:tw-scale-95 tw-uppercase tw-bg-primary-main tw-border-none hover:tw-bg-primary-dark tw-text-white'>Return to Home</Link>
      </div>
    </div>
  )
}

export default Error404