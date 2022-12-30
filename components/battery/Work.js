import Card from "./helper/Card"
import battery from '../../public/battery.jpg'
import bu from '../../public/bu.png'

const Work = () => {

    const card = data.map(elem => {
        return (
            <Card
                key     = {elem.id}
                item    = {elem}
            />
        )
    })

  return (
    <div className="flex flex-wrap m-4">
        {card}
    </div>
  )
}

export default Work

const data = [
    {
        id          : 1,
        ref         : "https://www.battery.com/company/#sector=application-software",
        name        : "Battery Ventures",
        start       : "Dec 2021",
        end         : "Apr 2022",
        title       : "Analyst Sourcing Extern",
        src         : battery,
        descript1   : "∙ Sourced and led deal due-diligence for potential minority investments in early-stage and growth-stage B2B SaaS.",
        descript2   : "∙ Developed the investment thesis and pitched potential investment opportunities to Battery senior leadership & led discussions with target company CEOs and drove financial due-diligence of key SaaS metrics."
    },
    {
        id          : 2,
        ref         : "https://www.battery.com/company/#sector=application-software",
        name        : "Battery Ventures",
        start       : "May 2022",
        end         : "Aug 2022",
        title       : "Analyst Diligence Extern",
        src         : battery,
        descript1   : "∙ Diligenced the Automotive Repair Shop Software category; completed competitive landscaping, market sizing, product/feature comparisons, and market mapping. ",
        descript2   : "∙ Identified key investment targets - managing discussions with respective management teams and preparing buy-side materials for management presentations."
    },
    {
        id          : 3,
        ref         : "https://www.bu.edu/eng/",
        name        : "BU College of Engineering",
        start       : "Sep 2021",
        end         : "Dec 2021",
        title       : "Teaching Assistant",
        src         : bu,
        descript1   : "• Hold office hours for a 300+ class.",
        descript2   : "• Plan, Prepare and Conduct review sessions for examinations."
    },
    {
        id          : 4,
        ref         : "https://www.bu.edu/urop/achievements/award-recipients/2020-2021-awarded-students/",
        name        : "BU Chemistry, NSF, UROP",
        start       : "Jan 2021",
        end         : "Aug 2021",
        title       : "Undergraduate Research Assistant",
        src         : bu,
        descript1   : "∙ Conducted Research on Super-Critical Fluids under the guidance of Associated Head of BU Chemistry & Optical Engineer at NKT Photonics: ",
        descript2   : "∙ SCFs are potential green fuels. We became one of the first groups to experimentally challenge existing theories and get insight into the properties of the previously meagerly studied field of SCFs."
    },
]