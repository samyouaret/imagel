import React from "react"
import Image from "../components/Image"
import useFetch from "../hooks/useFetch"

function ImageList(props) {
    const params = props.params;
    let url = new URL(location.origin + '/images')
    if (params) {
        console.log(params);
        url.search = new URLSearchParams(params).toString();
    }
    console.log(url);
    const { response: images, error, setResponse: setImages } = useFetch(url);
    if (images && images.length > 0) {
        return (
            <div className="flex flex-wrap -m-1">
                {images.map((image) => {
                    return (<div key={image.id} className="sm:w-1/2 md:w-1/3">
                        <Image data={image}></Image>
                    </div>)
                })}
            </div>
        )
    } else {
        return <div className="text-center text-2xl text-gray-600  border border-gray-300 mt-10 p-5">no Picture Found yet.</div>
    }

}

export default ImageList