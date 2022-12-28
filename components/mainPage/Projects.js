const Projects = () => {
  return (
    <div className="grid grid-cols-2 gap-7">

    </div>
  )
}

export default Projects

const data = [
    {
        id      : 1,
        name    : "Spotify To Youtube",
        href    : "https://github.com/ArkashJ/Spotify-to-Youtube",
        descript: "A tool to transfer Spotify Playlists to Youtube. We use Oauth2 Spotify Login for the app, and the app displays all the users songs in a table. They can select the songs they want to transfer and on the click on a button, it makes a youtube playlist of those songs"
    },
    {
        id      : 2,
        name    : "STU STREET Podcast Website",
        href    : "https://github.com/ArkashJ/STU-STREET-Website",
        descript: "A website I made for the Podcast I co-host"
    },
    {
        id      : 3,
        name    : "PersonaLearn",
        href    : "https://github.com/ArkashJ/STU-STREET-Website",
        descript: "A tool that uses openAI to generate video recommendations for concepts based on the video transcript. The user uses our slider whenever they are confused and our code picks keywords to generate a list of recommended videos"
    },
    {
        id      : 4,
        name    : "OCaml Interpreter",
        href    : "https://github.com/ArkashJ/OCaml-Interpreter",
        descript: "A Backaus Naur Form (BNF) based, context free interpreter to do any unary or binary operation on a list. It supports closures, functions and mutual recursion."
    },
]