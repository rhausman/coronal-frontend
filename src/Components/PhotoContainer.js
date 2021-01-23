import React from "react"
import { Image } from "react-bootstrap"
//import ImageLoader from 'react-image-file';

function PhotoContainer(props) {
    const { file = null } = props
    //console.log(file)
    return (
        <>
            <Image src={file} fluid />

        </>
    )
}

export default PhotoContainer