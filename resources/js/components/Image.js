import React from "react"
import { useState } from "react"

function Image({ data }) {
    return (<div className="border rounded-md border-gray-200 shadow-sm p-2 m-1">
        <img defer src={"/storage/uploads/" + data.url} className="mb-2" />
        <h2 className="text-2xl text-gray-800 mt-1">{data.title}</h2>
        <h3 className="text-md text-gray-700 mt-2 ml-1">{data.description}</h3>
    </div>)
}

export default Image