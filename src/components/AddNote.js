import React from 'react'
import { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'
 
const AddNote = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context
    //Creating a note state locally
    const [note, setNotes] = useState({ title: "", description: "", tag: "" })
    const handleClick = async (e) => {
        e.preventDefault()
        //Adding the note to the notes array
        if (note.title.length < 5) { props.showAlert("Title should be min 5 characters in length") }
        else if (note.description.length < 5) { props.showAlert("Description should be min 5 characters in length") }
        else {
            addNote(note.title, note.description, note.tag)
            setNotes({ title: "", description: "", tag: "" })
            props.showAlert("Note Added")
        }

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
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
                </form>
            </div>

        </>
    )
}

export default AddNote
