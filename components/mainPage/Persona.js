import myImg from '../../public/myImg.jpeg';
import Image from 'next/image';

const Persona = (props) => {
  return (
    <div className='flex flex-row'>
        <Image 
            src         = {myImg}
            alt         = "Picture of Arkash Jain"
            width       = {300}
            height      = {300}
            className   = "rounded-xl ml-[8%] mt-7"  
        />
        <div className='mt-7 pl-[10%] overflow-hidden break-words w-[60%] spacing-y-4'>
            <p className='text-white text-l tracking-wider'>
                <span className='text-6xl text-white '>My </span> 
                name's Arkash Jain and I'm a junior doing a BA (Math & CS)/ MS (CS) at Boston Univeristy.
                
                A software engineer by trade, I have a deep rooted interest in entrepreneurship and 
                am exhilirated by the prospect of working for a high growth tech startup. 
            </p>
            <p className = 'py-2 text-white text-l tracking-wider'>I found my calling in tech through 2 internships at Battery Ventures, a VC focussing on 
                early stage B2B SaaS. For the first internship I focussed on sourcing startups across different
                verticals and for the second one, doing diligence on a specific industry. 
            </p>
            <p className='py-2 text-white text-l tracking-wider'>Since then I have been advising startups on campus
            and doing outreach for the Entrepreneurs club as a VP. I have helped 2 companies design a product by
            doing usability testing, making personas and conducting interviews to launching a MVP. </p>

            <p className='py-2 text-white text-l tracking-wider'>Outside of school I co-host a podcast where we interview 
            professors, athletes, artists and professionals to bring deep industry insight to students.</p>

            <p className='py-2 text-white text-l tracking-wider'>You'll find more about me as you go through this website!</p>
        </div>
        
    </div>
  )
}

export default Persona