import React from "react"
import ImageList from "../components/ImageList"

function UserPage() {
    let userId = location.pathname.split("/").pop() || 0;
    return (
        <ImageList params={{ owner: userId }}></ImageList>
    )
}

export default UserPage