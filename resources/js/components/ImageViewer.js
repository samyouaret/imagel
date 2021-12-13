import React from "react"
import { useState } from "react"

function ImageViewer({ image, close }) {
    return (<div className="fixed overflow-scroll bg-blue-900 bg-opacity-25 w-100 left-0 right-0 top-0 bottom-0">
        <div className="border mx-auto bg-white relative rounded-md border-gray-300 p-2 w-11/12 mt-10">
            <small className="text-3xl text-gray-700 p-1 float-right mr-3 font-bold cursor-pointer" onClick={close}>&times;</small>
            <img defer src={"/storage/uploads/" + image.url} className="mb-2 mx-auto cursor-pointer" />
            <h2 className="text-2xl text-gray-800 mt-1">{image.title}</h2>
            <h3 className="text-md text-gray-700 mt-2 ml-1">{image.description}</h3>
        </div>
    </div>)
}

export default ImageViewer