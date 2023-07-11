import React, { useEffect, useState, useContext } from 'react'
import { Buffer } from 'buffer'
import FileContext from '../context/FileContext'

const FileItem = (props) => {
    const { file } = props
    const [imgUrl, setImgUrl] = useState('')

    const context = useContext(FileContext)
    const { deletefile } = context


    const handleClick = () => {
        deletefile(file._id)
    }

    useEffect(() => {
        const ImageUrl = Buffer.from(file.img.data.data).toString('base64')
        const test = ImageUrl.slice(21)
        setImgUrl(test)
    }, [])// eslint-disable-line



    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{ width: "18rem" }}>
                <img className="card-img-top" src={`data:image/jpeg;base64,/${imgUrl}`} alt="" style={{ height: '200', width: '200' }} />
                <div className="card-body">
                    <h5 className="card-title">{file.title}</h5>
                    <i className="fa-sharp fa-solid fa-trash mx-3" id='delete' name='delete' onClick={handleClick}></i>
                </div>
            </div>
        </div>
    )
}

export default FileItem
