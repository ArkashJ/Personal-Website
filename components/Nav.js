import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900 font-poppins'>
        <div className='conatiner mx-auto flex flex-wrap items-center justify-between'>
            <h1 className='text-[#e2e8f0] text-2xl'>Arkash Jain's Portfolio</h1>
            <div className='hidden w-full md:block md:w-auto'>
                <ul className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                    <li className='text-white'>
                        <Link  href='/'>Home</Link>
                    </li>
                    <li className='text-white'>
                        <Link href='/Volunteering'>Volunteering</Link>
                    </li>
                    <li className='text-white'>
                        <Link href='/Projects'>Projects</Link>
                    </li>
                    <li className='text-white'>
                        <Link href='/VC'>Venture Capital</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Nav