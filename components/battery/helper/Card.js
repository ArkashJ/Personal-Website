import Image from 'next/image'

const Card = (props) => {
  return (
    <div className="p-4 md:w-1/2 w-full">
        <div className="h-full bg-gray-800 bg-opacity-40 p-8 rounded">
            <div className="inline-flex items-center justify-center">
                <Image
                    width       = {200}
                    height      = {200}
                    src         = {props.item.src}
                    alt         = "Battery Ventures Image"
                    className   = 'transform transition hover:scale-110 cursor-pointer'
                    onClick     = {() => window.open(props.item.ref, '_blank')}
                />
                <span className='flex-grow flex flex-col pl-7'>
                    <span className='title-font font-medium text-2xl text-white'>
                        {props.item.name}
                    </span>
                    <span className='text-white text-l'>
                        <i>{props.item.title}</i>
                    </span>
                    <span className='text-gray-500 uppercase'>
                        {props.item.start} - {props.item.end}
                    </span>
                </span>
            </div>
            <p className='leading-relaxed text-gray-400 spacing-tight mb-6 mt-2'>
                {props.item.descript1}
            </p>
            <p className='leading-relaxed text-gray-400 spacing-tight mb-6 mt-2'>
                {props.item.descript2}
            </p>
        </div>
    </div>
  )
}

export default Card