import React from 'react'

import { ClientSafeProvider, getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import Providers from './Providers';
import { redirect } from 'next/navigation'

const Login = async () => {
  await checkSession();
  const providers = await fetchProviders();

  return (
    <div className='tw-grid tw-justify-items-center tw-content-start tw-flex-grow tw-lg:min-h-screen tw-w-full code-block-bg'>
      <div className="tw-w-[90%] md:tw-w-4/5 lg:tw-w-1/2 tw-flex tw-flex-col tw-items-center">
        <div className="tw-text-center tw-p-1 tw-mt-6 tw-mb-4">
          <h1 className="tw-text-5xl tw-text-black-light tw-font-bold">Login to CodeBlock</h1>
        </div>
        <div className="tw-grid tw-place-items-center tw-w-full tw-max-w-lg tw-px-1 tw-py-4 lg:tw-py-8 tw-my-4 tw-shadow-md tw-text-black tw-bg-white-main tw-font-medium tw-rounded-md">
          {providers && <Providers providers={providers} />}
        </div>
      </div>
    </div>
  )
}

export default Login

async function fetchProviders() {
  const providers = await getProviders();
  const providerArray: ClientSafeProvider[] = Object.values(providers as Object);
  return providerArray;
}

async function checkSession() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }
}