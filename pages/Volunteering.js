import React from 'react'
import Head from "next/head"
import Info from '../components/volunteer/Info'

const Volunteering = () => {
  return (
    <div className='w-full h-screen'>
        <Head>
            <title>Volunteering</title>
        </Head>
        <Info/>
    </div>
  )
}

export default Volunteering