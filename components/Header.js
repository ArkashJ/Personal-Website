import React from 'react'
import styles from '../styles/Dynamic.module.css'

const Header = () => {
  return (
    <div className='border-b-2 border-[#e2e8f0] h-[30%] w-[1500px]'>
        <h1 className='text-7xl text-center text-white font-mono'>
            I'm 
                <ul className={styles.dynamictxt}>
                    <li><span>Arkash Jain</span></li>
                    <li><span>a Full Stack Dev</span></li>
                    <li><span>a Podcaster</span></li>
                    <li><span>and an Entreprenuer</span></li>
                </ul>
        </h1>
        <p className='pt-4 tracking-tighter text-white text-center text-2xl font-mono'>Passioniate about B2B SaaS, Entrepreneurship and Venture Capital</p>
    </div>
  )
}

export default Header