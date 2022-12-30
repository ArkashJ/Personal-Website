import Image from 'next/image'
const Template = (props) => {
  return (
    <div className="flex flex-row justify-center items-start ml-[4%]">

        <Image
            src         = {props.item.src}
            width       = {400}
            height      = {400}
            className   = "rounded-lg mb-[50px] hover:scale-110 transform transition-transform"
            style       = {{cursor:'pointer'}}
            onClick     = {() => window.open(props.item.ref, '_blank')}
        />

        <div className="flex flex-col justify-start align-middle pl-[40px]">

            <div className="text-xl font-mono text-[#FC6D6D] font-bold tracking-wider">
                <h1>{props.item.name}</h1>
            </div>
            <div className="text-l font-mono mt-2 tracking-tight">
                <h1><i>{props.item.title}</i></h1>
            </div>
            <div className="text-justify font-sans w-[90%] subpixel-antialiased leading-loose text-gray-400">
                <p>{props.item.descript}</p>
            </div>

        </div>
        
    </div>
  )
}

export default Template