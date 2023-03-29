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
    <div className='tw-flextw-flex-col lg:tw-w-60'>
      {(providers).map((provider, i) => (
        <div key={provider.name} className='tw-w-full'>
          <button
            type='button'
            className={`${provider.id} tw-w-full tw-flex tw-flex-row tw-items-center tw-rounded-sm tw-my-0.5 tw-h-12 tw-text-base tw-border-2 tw-border-solid`}
            onClick={() => signIn(provider.id, { callbackUrl: '/dashboard' })}
          >
            <Image className='tw-ml-3' height={24} width={24} src={`./providers/${provider.id}.svg`} alt={`${provider.name} logo not found`} />
            <div className='tw-flex-grow tw-text-center tw-px-4'>Sign in with{' '} {provider.name}</div>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Providers