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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQ5OWUwNWNlNmRlNDNhZTU1MWEzYiIsImlhdCI6MTY3MjY2OTA0M30.AvMhfT8Pal7xBeVsP-4vz4b9HmdIUCteTJWtxN-ns70'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQ5OWUwNWNlNmRlNDNhZTU1MWEzYiIsImlhdCI6MTY3MjY2OTA0M30.AvMhfT8Pal7xBeVsP-4vz4b9HmdIUCteTJWtxN-ns70'
            },
            body: JSON.stringify({ title, description, tag })
        });

        console.log(response.json)
        
        //Logic to edit a note on the client side is below
        //Searching the note in the database
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
            }
        }

    }


    //Add a note
    const addNote = async (title, description, tag) => {
        //Api Call
        const url = `http://localhost:5000/api/notes/addnote`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQ5OWUwNWNlNmRlNDNhZTU1MWEzYiIsImlhdCI6MTY3MjY2OTA0M30.AvMhfT8Pal7xBeVsP-4vz4b9HmdIUCteTJWtxN-ns70'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        // Logic to add the note on the client side

        setNotes(notes.concat(json))
    }

    //Delete a note
    const deleteNote = async (id) => {
        //Api call to delete the data from the database
        const url = `http://localhost:5000/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQ5OWUwNWNlNmRlNDNhZTU1MWEzYiIsImlhdCI6MTY3MjY2OTA0M30.AvMhfT8Pal7xBeVsP-4vz4b9HmdIUCteTJWtxN-ns70'
            },
        });
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


