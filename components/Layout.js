import Nav from './Nav'
import Meta from './Meta'
import styles from '../styles/Layout.module.css'
import Header from './mainPage/Header'

const Layout = ({children}) => {
  return (
    <>
        <Meta/>
        <Nav />
        <div className={styles.container}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    </>
  )
}

export default Layout