import React from "react"
import ImageList from "../components/ImageList"

function Home() {
    const owner = document.querySelector("meta[name='user'").content;
    return (
        <div>
        <ImageList params={{ owner }}/>
        </div>
    )
}

export default Home