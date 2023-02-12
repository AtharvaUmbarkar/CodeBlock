'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'

import '@/styles/providers.css'

interface ProvidersProps {
  providers: ClientSafeProvider[];
}

const Providers = ({ providers }: ProvidersProps) => {
  return (
    <div className='flex flex-col lg:w-60'>
      {(providers).map((provider, i) => (
        <div key={provider.name} className='w-full'>
          <button
            type='button'
            className={`${provider.id} w-full flex flex-row items-center rounded-sm my-0.5 h-12 text-base border-2 border-solid`}
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            <Image className='ml-3' height={24} width={24} src={`./providers/${provider.id}.svg`} alt={`${provider.name} logo not found`} />
            <div className='flex-grow text-center px-4'>Sign in with{' '} {provider.name}</div>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Providers