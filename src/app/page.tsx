import Image from 'next/image';

import demoCode from '@/public/home/demo-code-2.png'
import Link from 'next/link';

const Home = () => {
  return (
    <div className='grid place-items-center flex-grow lg:min-h-screen w-full code-block-bg'>
      <div className='flex flex-col flex-grow items-center w-3/4'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-medium my-8 text-center'>Can&apos;t find some code you saved a while back?</h1>
        <Image className='h-auto w-full md:w-3/4 lg:w-2/3' src={demoCode} alt='demo-code-image' placeholder='blur'/>
        <section>
          <h1 className='font-medium my-8 text-white text-2xl text-center'>
            CodeBlock lets you
            <span className='text-code-pink text-opacity-100 font-bold'> create </span>
            /
            <span className='text-code-green text-opacity-100 font-bold'> test </span>
            /
            <span className='text-code-yellow text-opacity-100 font-bold'> manage </span>
            your indispensible code snippets, to allow easy access for coding and sharing purposes.
          </h1>
        </section>
        <div className='flex flex-row flex-wrap text-xl gap-2 items-center justify-center mb-8'>
          <Link href={'/register'} className='my-1 py-1.5 px-3 w-36 rounded-sm text-center bg-blue-600 text-white border-2 border-solid border-blue-600 shadow-lg hover:bg-white hover:text-blue-600 hover:border-blue-600 cursor-pointer'>Register</Link>
          <Link href={'/login'} className='my-1 py-1.5 px-3 w-36 rounded-sm text-center bg-blue-600 text-white border-2 border-solid border-blue-600 shadow-lg hover:bg-white hover:text-blue-600 hover:border-blue-600 cursor-pointer'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Home;
