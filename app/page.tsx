import { Button } from '@/components/ui/button'
import { ArrowBigRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <div className="py-12 sm:py-20 lg:pb-40">
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center bg-stone-400/40 px-16 py-10 rounded-3xl dark:bg-tiber-950/70'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
              Chat with Anyone, Anywhere in the World!
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-800 dark:text-gray-300'>
              You speak your language, they speak their language.{" "}
              <br />
              <span className=''>
                Let AI handle the translation.
              </span>
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                href={"/chat"}
                className='font-semibold leading-6 px-3.5 py-2.5'>
                <Button variant={"ghost"} className=' bg-oasis-100 dark:text-black dark:hover:text-white'>
                  Get Started
                </Button>
              </Link>
              <Link
                href={"/pricing"}
                className='font-semibold leading-6 flex'>
                <Button variant={"outline"} className=' bg-livid-brown-600 border-none dark:text-black dark:hover:text-white'>
                  View Pricing <ArrowBigRight className='scale-75'/>
                </Button>
              </Link>
            </div>
          </div>
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl p-2 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src={""}
                alt=''
                height={5}
                width={5}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
