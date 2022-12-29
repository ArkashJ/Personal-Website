import Image from 'next/image'
const DisplayBox = (props) => {
  return (
    <div className="block my-10 bg-gray-800 rounded p-8 shadow-2xl">
        <h2 className="text-3xl border border-b-2 pb-3 text-primary border-secondary uppercase text-gray-400 font-mono italic">{props.name}</h2>
        <div className="grid grid-cols-2 p-4 gap-4">
            <div className="flex flex-wrap justify-center items-center text-center">
                <Image
                    src         = {props.items.src}
                    width       = {100}
                    height      = {100}
                    className   = "hover:scale-110 transform transition-transform"
                />
                <p className='text-xl font-mono text-gray-400'>{props.items.name}</p>
            </div>
        </div>
    </div>
  )
}

export default DisplayBox