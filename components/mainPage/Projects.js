import ai from '../../public/ai.jpg';
import spotify from '../../public/spotify.jpg'
import ocaml from '../../public/ocaml.jpg'
import stustreet from '../../public/stustreet.jpg'
import Widget from './helpers/Widget'
import mapreduce from '../../public/mapreduce.png'
import ttt from '../../public/ttt.png'

const Projects = () => {
   const widget = data.map(elem => {
       return (
           <Widget key  = {elem.id}
                   item = {elem}
            />
       )
   })
  return (
      <div className='border-b-2 border-[#e2e8f0] pb-[40px] w-[1500px]'>
      <div className='mx-[125px]'>
      <h1 className='py-2 font-mono text-3xl text-[#94a3b8]'>Projects</h1>
          <div className="grid grid-cols-2 gap-4 mt-[30px] ">
            {widget}
        </div>
      </div>
      </div>
    
  )
}

export default Projects

const data = [
    {
        id      : 1,
        name    : "Spotify To Youtube",
        ref     : "https://github.com/ArkashJ/Spotify-to-Youtube",
        descript: "A tool to transfer Spotify Playlists to Youtube. We use Oauth2 Spotify Login for the app, and the app displays all the users songs in a table. They can select the songs they want to transfer and on the click on a button, it makes a youtube playlist of those songs",
        src     : spotify
    },
    {
        id      : 2,
        name    : "OCaml Interpreter",
        ref     : "https://github.com/ArkashJ/OCaml-Interpreter",
        descript: "A Backaus Naur Form (BNF) based, context free interpreter to do any unary or binary operation on a list. It supports closures, functions and mutual recursion.",
        src     : ocaml
    },
    {
        id      : 3,
        name    : "PersonaLearn",
        ref     : "https://github.com/ArkashJ/STU-STREET-Website",
        descript: "A tool that uses openAI to generate video recommendations for concepts based on the video transcript. The user uses our slider whenever they are confused and our code picks keywords to generate a list of recommended videos",
        src     : ai
    },
    {
        id      : 4,
        name    : "STU STREET Podcast Website",
        ref     : "https://github.com/ArkashJ/STU-STREET-Website",
        descript: "A website for the podcast (STU STREET) I co-host. Made using React & tailwind. This website highlights our values, genres we explore and has links to all platforms our pdocast is available on",
        src     : stustreet
    },
    {
        id      : 5,
        name    : "TicTacToe, Order&Chaos, Connect4",
        ref     : "https://github.com/ArkashJ/TicTacToe2",
        descript: "An Object Oriented Programming model that uses abstract classes, interfaces and packages to extend any turn based board game",
        src     : ttt
    },
    {
        id      : 6,
        name    : "Map Reduce",
        ref     : "https://github.com/ArkashJ/mapreduce",
        descript: "Users specify a map function that processes a key/value pair to generate a set of intermediate key/value pairs, and a reduce function that merges all intermediate values associated with the same intermediate key",
        src     : mapreduce
    },
    
]