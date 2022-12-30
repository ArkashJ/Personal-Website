import Template from "./helper/Template";
import redcross from '../../public/redcross.jpg';
import bigbrother from '../../public/bigbrother.jpg';

const Info = () => {
    const infoCard = data.map(elem => {
        return (
            <Template
                key     = {elem.id}
                item    = {elem}
            />
        )
    })

  return (
    <div className="flex flex-col items-start">
        {infoCard}
    </div>
  )
}

export default Info

const data = [
    {
        id      : 1,
        src     : redcross,
        ref     : "https://www.linkedin.com/feed/update/urn:li:activity:6999793137124524032/",
        name    : "American Red Cross",
        title   : "Food Pantry Volunteer",
        descript: "I bag, collect and distribute food weekly for 4 hours at the red cross food pantry on Proctor St, Boston, MA 02119"
    },
    {
        id      : 2,
        src     : bigbrother,
        ref     : "https://emassbigs.org/",
        name    : "The Big Brothers and Big Sisters of Eastern Massachusetts",
        title   : "Big Brother",
        descript: "Bimonthly a volunteer with the Big Brothers & Big Sisters program to mentor a 10 year old child by playing games and engaging in various activities to teach them skills like leadership and confidence"
    }
]