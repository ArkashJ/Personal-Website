import Head from 'next/head'
import Header from '../components/mainPage/Header'
import Persona from '../components/mainPage/Persona'
import Projects from '../components/mainPage/Projects'
import Skills from '../components/mainPage/Skills'

export default function Home() {
  return (
    <div className="mt-2 w-full h-[3300px]">
      
      <Head>
        <title>Portfolio Website</title>
        <meta name="keywords" content="web developement, programming"></meta>
      </Head>
      <Header/>
      <Persona/>
      <Projects/>
      <Skills/>
    </div>
  )
}
