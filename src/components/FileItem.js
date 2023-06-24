import React, { useEffect, useState } from 'react'
// import DefaultImage from '../Images/DefaultProfileImage.png'
import { Buffer } from 'buffer'

const FileItem = (props) => {
    const { file } = props
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {
        const ImageUrl = Buffer.from(file.img.data.data).toString('base64')
        const test = ImageUrl.slice(21)
        setImgUrl(test)
    }, [])

    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{ width: "18rem" }}>
                <img className="card-img-top" src={`data:image/jpeg;base64,/${imgUrl}`} alt="" style={{ height: '200', width: '200' }} />
                <div className="card-body">
                    <h5 className="card-title">{file.title}</h5>
                </div>
            </div>
        </div>
    )
}

export default FileItem
