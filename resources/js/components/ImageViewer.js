import React from "react"
import { useState } from "react"

function ImageViewer({ data }) {
    return (<div className="border rounded-md border-gray-300 p-2 sm:w-1/2 md:w-1/3">
        <img defer src={"/storage/uploads/" + data.url} className="mb-2" />
        <h2 className="text-2xl text-gray-800 mt-1">{data.title}</h2>
        <h3 className="text-md text-gray-700 mt-2 ml-1">{data.description}</h3>
    </div>)
}

export default ImageViewer