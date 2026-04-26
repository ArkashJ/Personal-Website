import Nav from './Nav'
import Meta from './Meta'
import Footer from './Footer'
import JsonLd, { personSchema } from './seo/JsonLd'

const Layout = ({ children, meta = {} }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-white">
      <Meta {...meta} />
      <JsonLd data={personSchema()} />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
