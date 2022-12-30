import Image from 'next/image'
const DisplayBox = (props) => {
  return (
    <div className="flex flex-wrap flex-col justify-center items-center text-center">
                <Image
                    src         = {props.item.src}
                    width       = {80}
                    height      = {80}
                    className   = "hover:scale-110 transform transition-transform pb-2"
                    alt         = ""
                />
                <p className='text-xl font-mono text-gray-400'>{props.item.name}</p>
    </div>
  )
}



export default DisplayBox