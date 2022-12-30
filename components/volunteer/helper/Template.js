import Image from 'next/image'
const Template = (props) => {
  return (
    <div className="flex flex-row justify-center items-start">

        <Image
            src         = {props.item.src}
            width       = {400}
            height      = {400}
            className   = "rounded-lg mb- 1hover:scale-130 transform transition-transform"
            style       = {{cursor:'pointer'}}
            onClick     = {() => window.open(props.item.ref, '_blank')}
        />

        <div className="flex flex-col justify-start align-middle ">

            <div className="text-2xl font-sans text-[#FC6D6D] tracking-wider">
                <h1>{props.item.name}</h1>
            </div>
            <div className="text-justify font-sans subpixel-antialiased leading-loose text-gray-400">
                <p>{props.item.description}</p>
            </div>

        </div>
        
    </div>
  )
}

export default Template