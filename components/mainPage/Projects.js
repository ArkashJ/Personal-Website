import ai from '../../public/ai.png';
import spotify from '../../public/spotify.jpg'
import ocaml from '../../public/ocaml.jpg'
import stustreet from '../../public/stustreet.jpg'
import Widget from './Widget';

const Projects = () => {
  return (
    <div className="flex flex-wrap py-10 px-2 jusitfy-center items-center">
        {
        data.map((elem) => {
            <Widget {...elem}/>
            })
        }
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
        src     : {spotify}
    },
    {
        id      : 2,
        name    : "STU STREET Podcast Website",
        ref     : "https://github.com/ArkashJ/STU-STREET-Website",
        descript: "A website I made for the Podcast I co-host",
        src     : {stustreet}
    },
    {
        id      : 3,
        name    : "PersonaLearn",
        ref     : "https://github.com/ArkashJ/STU-STREET-Website",
        descript: "A tool that uses openAI to generate video recommendations for concepts based on the video transcript. The user uses our slider whenever they are confused and our code picks keywords to generate a list of recommended videos",
        src     : {ai}
    },
    {
        id      : 4,
        name    : "OCaml Interpreter",
        ref     : "https://github.com/ArkashJ/OCaml-Interpreter",
        descript: "A Backaus Naur Form (BNF) based, context free interpreter to do any unary or binary operation on a list. It supports closures, functions and mutual recursion.",
        src     : {ocaml}
    },
]