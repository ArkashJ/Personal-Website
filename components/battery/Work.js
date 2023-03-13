import Card from "./helper/Card"
import battery from '../../public/battery.jpg'
import bu from '../../public/bu.png'
import cs from '../../public/cs.png'
import bch from '../../public/bch.png'
import stealth from '../../public/stealth.jpg'

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
        ref         : "https://sites.bu.edu/casp/2022/07/12/secrecy-secure-collaborative-analytics-in-untrusted-clouds-accepted-at-nsdi23/",
        name        : "BU CS Systems Group",
        start       : "Jan 2023",
        end         : "Present",
        title       : "Undergraduate Research",
        src         : cs,
        descript1   : "∙ Conducted research on latest distributed systems including reading papers like MapReduce by Google, RAS by Meta, Inferline by UC Berkeley, Google File System and Raft",
        descript2   : "∙ Made presentations and wrote code in Go and Java for the functions above"
    },
    {
        id          : 2,
        ref         : "",
        name        : "Stealth Startup",
        start       : "Jan 2023",
        end         : "Present",
        title       : "Co-Founder and Engineer",
        src         : stealth,
        descript1   : "∙ Real Estate Solution Made using C# and Unity",
        // descript2   : "∙ "
    },
    {
        id          : 3,
        ref         : "https://www.childrenshospital.org/",
        name        : "Boston Children's Hospital",
        start       : "Jan 2023",
        end         : "Present",
        title       : "ALS Resource Engineering Intern",
        src         : bch,
        descript1   : "∙ Created and Shipped a web application(Accessibility feature incorporated) made using NextJS, typescript, TailwindCSS, StrapiUI, Azure Lambdas, DynamoDB. ",
        descript2   : "∙ People with ALS struggle to get good care because of communication problems. They shall log into the app and fill a questionnare such that every question is based on the previous question and the app essentially 'learns' from the use to produce a tailored result."
    },
    {
        id          : 4,
        ref         : "",
        name        : "Stealth Startup",
        start       : "Jun 2023",
        end         : "Present",
        title       : "Backend/Infrasturcture Engineering Intern",
        src         : stealth,
        descript1   : "∙ B2B SaaS company for Enterprises using Rust, Svelte, Typescript, Tailwind, Redis, Docker, NATS, PostgreSQL",
        descript2   : "∙ "
    },
    {
        id          : 5,
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
        id          : 6,
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
        id          : 7,
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
        id          : 8,
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