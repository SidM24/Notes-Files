import React, { useEffect, useContext, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import Alert from './Alert'

const Notes = () => {

    //using the global note context

    const context = useContext(NoteContext)
    const { notes, getnotes } = context


    //The below use effect would render the notes only on the first render due to empty [] at last
    useEffect(() => {
        getnotes()
    }, [])


    //ref is used to keep values between render as after render all values are reset except the ref
    //useRef is a hook

    const ref = useRef(null)
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "default" })

    const [isOpen, setIsOpen] = useState(false);

    const updateNotes = (currentNote) => {
        ref.current.click();
        setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleUpdateNoteClick = (e) => {
        console.log('note is being update', note)
        e.preventDefault();
    }
    return (
        <>
            <div style={{ position: 'absolute', width: '85%', margin: 'auto', padding: '1rem', marginTop: '1rem', zIndex: '-9' }}>
                <AddNote></AddNote>
                <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-target="#test" onClick={() => {
                    setIsOpen(true)
                }} style={{ display: 'none' }}>
                </button>

                <div className="row my-3">
                    <h1>Your Notes</h1>
                    {notes.map((note) => {
                        return <NoteItem note={note} key={note._id} updateNotes={updateNotes} ></NoteItem>
                    })}
                </div>
            </div>


            {/* below is demo modal overlay */}
            {isOpen &&
                (
                    <div className="outer" style={{ position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', marginLeft: '-3vw', marginTop: '5vh', height: '85vh', width: '90vw', opacity: '0.9' }}>
                        <div className="c" style={{ opacity: '1', color: 'white', border: '2px solid white', padding: '1rem', width: '25rem' }}>
                            <h1 style={{ textAlign: 'center' }}>Edit Text</h1>
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                            <button style={{ borderRadius: '10px', width: '10rem', margin: '0.5rem', opacity: '1', backgroundColor: 'blue', color: 'white', marginTop: '1rem' }} onClick={() => { setIsOpen(false) }}>Close</button>
                            <button style={{ borderRadius: '10px', width: '10rem', margin: '0.5rem', opacity: '1', backgroundColor: 'blue', color: 'white', marginTop: '1rem' }} onClick={handleUpdateNoteClick}>UpdateNote</button>
                        </div>
                    </div>
                )}
        </>
    )
}

export default Notes
