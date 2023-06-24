import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/NoteContext'

const NoteItem = (props) => {

    const context = useContext(NoteContext)
    const { deleteNote } = context
    const { note, updateNotes } = props

    //Function to delete a note 
    const handleClick = () => {
        deleteNote(note._id)
        props.showAlert("Note Successfully Deleted")
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-sharp fa-solid fa-trash mx-3" id='delete' name='delete' onClick={handleClick}></i>
                    <i className="fa-sharp fa-solid fa-pen-to-square" id='edit' name='edit' onClick={() => { updateNotes(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
