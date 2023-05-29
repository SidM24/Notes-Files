import React from 'react'
import { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'

const AddNote = () => {
    const context = useContext(NoteContext)
    const { addNote } = context
    //Creating a note state locally
    const [note, setNotes] = useState({ title: "", description: "", tag: "Default" })
    const handleClick = (e) => {
        // e.preventDefault()
        addNote(note.title, note.description, note.tag)
    }
    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
                </form>
            </div>

        </>
    )
}

export default AddNote
