import React from "react"
import { useState, useEffect, useRef } from "react"
import ImageViewer from "./ImageViewer"

function Image({ data }) {
    let [viewMode, setViewMode] = useState(false);
    let [likes, setLikes] = useState(data.likes);
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        const likeImage = async () => {
            try {
                const res = await fetch(`/user/likes/${data.id}`, {
                    method: "POST",
                    body: JSON.stringify({
                        _csrf: document.getElementById('_csrf').value,
                        likes,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                const json = await res.json();
                if(json.error){
                    location.replace('/signin');
                }
            } catch (error) {
                console.log(error);
            }
        };
        likeImage();
    }, [likes]);
    const scope = document.querySelector("meta[name='scope']").content;
    const owner = document.querySelector("meta[name='user'").content;
    let editButton = null;
    if (scope == "user" && owner == data.owner) {
        editButton = <a href={`/images/${data.id}/edit`} className="border-0 p-1 text-sm text-white bg-blue-700">edit</a>;
    }
    function viewImage(image) {
        if (viewMode) {
            return (<ImageViewer image={data} close={() => setViewMode(false)}></ImageViewer>)
        }
        return null;
    }
    const likeImage = likes < 1 ? "like_empty.svg"
        : "like_filled.svg";
    return (
        <React.Fragment>
            {viewImage()}
            <div className="flex flex-col border rounded-md border-gray-200 shadow-sm p-2 m-1">
                <img defer src={"/storage/uploads/" + data.url} className="mb-2 cursor-pointer hover:scale-125" onClick={() => setViewMode(true)} />
                <h2 className="text-2xl text-gray-800 mt-1">{data.title}</h2>
                <h3 className="text-md text-gray-700 mt-2 ml-1">{data.description}</h3>
                <small className="text-sm text-gray-200 my-2">
                    {editButton}
                    <img defer src={"/storage/images/" + likeImage} onClick={() => setLikes(likes ? 0 : 1)}
                        className="mb-2 float-right cursor-pointer" style={{ maxWidth: "20px" }} />
                </small>
            </div>
        </React.Fragment>
    )
}

export default Image