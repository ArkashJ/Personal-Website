import htmlImg from '../../public/html.jpg'
import cssImg from '../../public/css.png'
import js from '../../public/js.jpg'
import rct from '../../public/react.png'
import mui from '../../public/mui.png'
import tailw from '../../public/tailw.jpg'
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

  const other = other.map(elem => {
    return (
        <DisplayBox key  = {elem.id}
                    item = {elem}
         />
    )
  })
  
  
  


  return (
    <div>Skills</div>
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
      src : mui,
      name: "Material UI"
    },
    {
      id  : 6,
      src : tailw,
      name: "Tailwind"
    },
    {
      id  : 7,
      src : nextjs,
      name: "Nextjs"
    }
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