import Image from 'next/image'

const Widget = (props) => {
    const url = props.ref
  return (
    <div className='w-[250px] h-[25px] flex flex-col items-center'>
        <h1>{props.name}</h1>
        <Image
        src         = {props.src}
        alt         = {props.descript}
        width       = {250}
        height      = {250}
        className   = "rounded-b-lg"
        onClick     = {() => window.open(url, '_blank')}
    />
        <p className='overflow-hidden break-words w-[80%]'>{props.descript}</p>
    </div>
    
  )
}

export default Widget