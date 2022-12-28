import Head from 'next/head'
import Header from '../components/Header'
import Persona from '../components/mainPage/Persona'
export default function Home() {
  return (
    <div className="mt-2 w-full h-screen">
      
      <Head>
        <title>Portfolio Website</title>
        <meta name="keywords" content="web developement, programming"></meta>
      </Head>
      <Header/>
      <Persona/>
    </div>
  )
}
