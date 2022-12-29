import Image from 'next/image'

const Widget = (props) => {
  return (
    <div className='bg-[#d6d3d1] flex flex-col justify-between items-center space-y-[-10%] h-[450px] w-[450px] rounded-xl  drop-shadow-md'>
        <h1 className='text-[#4c86a8] font-bold py-4 font-[700] text-[15px]'>{props.item.name}</h1>
        <p className='podcast-title font-poppins w-[410px] px-5'>{props.item.descript}</p>
        <Image
            src         = {props.item.src}
            alt         = {props.item.descript}
            width       = {400}
            height      = {400}
            className   = "rounded-lg  mb-1"
            priority    = {true}
            style={{cursor:'pointer', marginBottom: '10px'}}
            onClick     = {() => window.open(props.item.ref, '_blank')}
            />
    </div>
  )
}
{/* <p className='overflow-hidden break-words'>{props.item.descript}</p> */}
export default Widget