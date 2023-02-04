import Image from 'next/image';

import demoCode from '@/public/home/demo-code-2.png'

const Home = () => {
  return (
    <div className='grid place-items-center flex-grow lg:self-stretch w-full bg-gradient-to-br from-blue-900 to-blue-700'>
      <div className='flex flex-col flex-grow items-center w-3/4'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-medium my-8'>Can&apos;t find some code you saved a while back?</h1>
        <Image className='h-auto w-full md:w-3/4 lg:w-2/3' src={demoCode} alt='demo-code-image' />
        <section>
          <h1 className='font-medium my-8 text-white text-2xl'>
            CodeBlock lets you
            <span className='text-blue-500 font-medium'> create </span>
            /
            <span className='text-blue-500 font-medium'> test </span>
            /
            <span className='text-blue-500 font-medium'> manage </span>
            your indispensible code snippets, to allow easy access for coding and sharing purposes.
          </h1>
        </section>
        <div className='flex flex-row flex-wrap text-xl gap-2 items-center justify-center mb-8'>
          <div className='my-1 py-1.5 px-3 w-36 rounded-sm text-center bg-blue-600 text-white border-2 border-solid border-blue-600 shadow-lg hover:bg-white hover:text-blue-600 hover:border-blue-600 cursor-pointer'>Register</div>
          <div className='my-1 py-1.5 px-3 w-36 rounded-sm text-center bg-blue-600 text-white border-2 border-solid border-blue-600 shadow-lg hover:bg-white hover:text-blue-600 hover:border-blue-600 cursor-pointer'>Login</div>
        </div>
      </div>
    </div>
  )
}

export default Home;
