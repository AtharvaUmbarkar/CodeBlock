import React from 'react'

import { ClientSafeProvider, getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import Providers from './Providers';
import { redirect } from 'next/navigation'
import { Session } from 'next-auth';

const Login = async () => {
  await checkSession();
  const providers = await fetchProviders();

  return (
    <div className='grid justify-items-center content-start flex-grow lg:min-h-screen w-full code-block-bg'>
      <div className="w-[90%] md:w-4/5 lg:w-1/2 flex flex-col items-center">
        <div className="text-center p-1 mt-6 mb-4">
          <h1 className="text-5xl text-white font-bold">Login to CodeBlock</h1>
        </div>
        <div className="grid place-items-center w-full max-w-lg px-1 py-4 lg:py-8 my-4 shadow-2xl text-black bg-gray-100 font-medium rounded-md">
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
    redirect('/');
  }
}