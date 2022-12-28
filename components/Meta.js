import Head from 'next/head';

const Meta = ({title, keywords, description}) => {
  return (
    <Head>
       <meta name='viewport' content='width=device-width, initial-scalce=1'/>
       <meta name='keywords' content={keywords}/>
       <meta name='description' content={description}/>
       <meta charSet='utf-8'/>
       <title>{title}</title> 
    </Head>
  )
}
Meta.defaultProps = {
    title: "Arkash Jain's website",
    keywords: 'Full stack, entrepreneur, VC',
    description: 'student passionate about working at a high growth startup'
}

export default Meta