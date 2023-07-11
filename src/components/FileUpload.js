import React from 'react'
import { useContext, useState, useEffect } from 'react'
import FileContext from '../context/FileContext'
import { useNavigate } from 'react-router-dom'
import FileItem from './FileItem'


const FileUpload = (props) => {

  const context = useContext(FileContext)
  const { files, addfile, getallfiles } = context
  //Local temporary file variable
  const [file, setFile] = useState({ title: "", description: "", tag: "" })
  //Image Variable
  const [img, setImg] = useState({
    imageUrl: '',
    file: null
  })
  let navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getallfiles()
    }
    else {
      navigate('/login')
    }
  }, [])// eslint-disable-line

  //To handle the submit button click
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await addfile(file.title, file.description, file.tag, img.imageUrl)
    } catch (error) {
      console.log(error)
    }
  }
  //To handle the onChange for form field except the file
  const onChange = (e) => {
    setFile({ ...file, [e.target.name]: e.target.value })
  }
  //To handle the onChange for the file input
  const PreviewImageChangeHandler = (e) => {
    const reader = new FileReader()

    reader.onload = (r) => {
      setImg({
        imageUrl: r.target.result,
        file: e.target.files[0]
      })
    }

    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <>
      <div className="container my-3">
        <h1>Add a File as Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' value={file.title} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' value={file.description} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={file.tag} onChange={onChange} />
          </div>
          <div className="mb-3">
            {/* //Preview Image would Load Here */}
            <div className="container my-3" style={{ display: !img.imageUrl ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center' }} >
              <img style={{ objectFit: 'cover', height: 200, width: 250, textAlign: 'center', margin: 'auto' }} src={img.imageUrl} alt="" />
            </div>
            <input type="file" className="form-control" onChange={PreviewImageChangeHandler} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add File</button>
        </form>

        <div className="row my-3">
          <h1>Your Notes</h1>
          {files.map((file) => {
            return <FileItem file={file} key={file._id} ></FileItem>
          })}
        </div>
      </div>
    </>
  )
}

export default FileUpload
