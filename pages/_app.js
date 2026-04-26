import '../styles/globals.css'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
  const meta = Component.meta || {}
  return (
    <Layout meta={meta}>
      <Component {...pageProps} />
    </Layout>
  )
}
