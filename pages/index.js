import Head from 'next/head'
import Header from '../components/Header'
import Persona from '../components/mainPage/Persona'
import Projects from '../components/mainPage/Projects'

export default function Home() {
  return (
    <div className="mt-2 w-full h-[2500px]">
      
      <Head>
        <title>Portfolio Website</title>
        <meta name="keywords" content="web developement, programming"></meta>
      </Head>
      <Header/>
      <Persona/>
      <Projects/>
    </div>
  )
}
