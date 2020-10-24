import React from "react"
import Image from "../components/Image"
import useFetch from "../hooks/useFetch"

function ImageList({ params }) {
    let url = new URL(location.origin + '/images')
    if (params) {
        url.search = new URLSearchParams(params).toString();
    }

    const { response: images, error, setResponse: setImages } = useFetch(url, { query: {} });
    if (images) {
        return (
            <div className="flex flex-wrap -m-1">
                {images.map((image) => {
                    return (<div key={image.id} className="sm:w-1/2 md:w-1/3">
                        <Image data={image}></Image>
                    </div>)
                })}
            </div>
        )
    }

    return null;
}

export default ImageList