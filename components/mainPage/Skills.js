import htmlImg from '../../public/html.jpg'
import cssImg from '../../public/css.png'
import js from '../../public/js.png'
import rct from '../../public/React.png'
import mui from '../../public/mui.png'
import tailw from '../../public/tailw.png'
import c from '../../public/c.png'
import python from '../../public/python.png'
import node from '../../public/node.png'
import nextjs from '../../public/nextjs.png'
import docker from '../../public/docker.png'
import ex from '../../public/ex.png'
import figma from '../../public/figma.png'
import java from '../../public/java.png'
import matlab from '../../public/matlab.png'
import mongo from '../../public/Mongo.png'
import sql from '../../public/sql.png'
import flask from '../../public/flask.png'
import git from '../../public/git.png'
import github from '../../public/github.png'
import gitlab from '../../public/gitlab.png'
import DisplayBox from './helpers/DisplayBox'

const Skills = () => {
  const front = frontend.map(elem => {
    return (
        <DisplayBox key  = {elem.id}
                    name = "Frontend"
                    item = {elem}
         />
    )
  })

  const back = backend.map(elem => {
    return (
        <DisplayBox key  = {elem.id}
                    item = {elem}
         />
    )
  })

  const version = vcontrol.map(elem => {
    return (
        <DisplayBox key  = {elem.id}
                    item = {elem}
         />
    )
  })

  const others = other.map(elem => {
    return (
        <DisplayBox key  = {elem.id}
                    item = {elem}
         />
    )
  })
  
  return (
    <div className=' px-[130px] py-5 pb-5'>
      <h1 className='py-2 font-mono text-3xl text-[#94a3b8]'>Skills</h1>

      <div className='flex flex-col '>

        <div className="block my-10 bg-gray-800 rounded p-8 shadow-2xl">
          <h2 className="text-3xl pb-3 text-primary border-secondary uppercase text-gray-400 font-mono italic">Frontend</h2>
            <div className="grid grid-cols-7 items-end p-2 gap-2">
              {front}
            </div>
        </div>

        <div className="block my-10 bg-gray-800 rounded p-8 shadow-2xl">
          <h2 className="text-3xl pb-3 text-primary border-secondary uppercase text-gray-400 font-mono italic">Backend and Databases</h2>
            <div className="grid grid-cols-7 items-end p-2 gap-2">
              {back}
            </div>
        </div>

        <div className="block my-10 bg-gray-800 rounded p-8 shadow-2xl">
          <h2 className="text-3xl pb-3 text-primary border-secondary uppercase text-gray-400 font-mono italic">Version Control</h2>
            <div className="grid grid-cols-7 items-end p-2 gap-2">
              {version}
            </div>
        </div>

        <div className="block my-10 bg-gray-800 rounded p-8 shadow-2xl">
          <h2 className="text-3xl pb-3 text-primary border-secondary uppercase text-gray-400 font-mono italic">Others</h2>
            <div className="grid grid-cols-7 items-end p-2 gap-2">
              {others}
            </div>
        </div>

      </div>
      
    </div>
  )
}

export default Skills

const frontend = [
    {
        id  : 1,
        src : htmlImg,
        name: "HTML"
    },
    {
      id  : 2,
      src : cssImg,
      name: "CSS"
    },
    {
      id  : 3,
      src : js,
      name: "Javascript"
    },
    {
      id  : 4,
      src : rct,
      name: "React"
    },
    {
      id  : 5,
      src : nextjs,
      name: "Nextjs"
    },
    {
      id  : 6,
      src : mui,
      name: "Material UI"
    },
    {
      id  : 7,
      src : tailw,
      name: "Tailwind"
    },
    
]

const backend = [
  {
      id  : 1,
      src : node,
      name: "NodeJs"
  },
  {
    id  : 2,
    src : ex,
    name: "ExpressJs"
  },
  {
    id  : 3,
    src : flask,
    name: "Flask"
  },
  {
    id  : 4,
    src : mongo,
    name: "MongoDB"
  },
  {
    id  : 5,
    src : sql,
    name: "SQLite"
  },
]

const other = [
  {
    id  : 1,
    src : python,
    name: "Python"
  },
  {
    id  : 2,
    src : c,
    name: "C"
  },
  {
    id  : 3,
    src : java,
    name: "Java"
  },
  {
    id  : 4,
    src : matlab,
    name: "MATLAB"
  },
  {
    id  : 5,
    src : docker,
    name: "Docker"
  },
  {
    id  : 6,
    src : figma,
    name: "Figma"
  }
]

const vcontrol = [
  {
    id  : 1,
    src : git,
    name: "Git"
  },
  {
    id  : 2,
    src : github,
    name: "Github"
  },
  {
    id  : 3,
    src : gitlab,
    name: "GitLab"
  },
]