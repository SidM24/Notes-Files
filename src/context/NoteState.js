import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial)


    //Get All Notes
    const getnotes = async () => {
        //Api Call
        const url = `http://localhost:5000/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const test = await response.json();
        setNotes(test)
    }


    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //Api call to edit a note
        //here id is the note id and not the auth token
        const url = `http://localhost:5000/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const test = await response.json();
        console.log(test)

        //Logic to edit a note on the client side is below
        let newNotes = JSON.parse(JSON.stringify(notes))
        //Searching the note in the database
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break
            }
        }
        setNotes(newNotes)
    }


    //Add a note
    const addNote = async (title, description, tag) => {
        //Api Call
        const url = `http://localhost:5000/api/notes/addnote`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        // Logic to add the note on the client side

        setNotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote = async (id) => {
        //Api call to delete the data from the database
        const url = `http://localhost:5000/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        console.log(response)
        //Client Side deltion code
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, deleteNote, editNote, addNote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState


 