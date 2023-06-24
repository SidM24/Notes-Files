import React from "react";
import { useState } from "react";
import FileContext from "./FileContext";


const FileState = (props) => {
    const filesInitial = [];
    const [files, setFiles] = useState(filesInitial)

    //Add a file
    const addfile = async (title, description, tag, img) => {
        //Api Call
        const url = `http://localhost:5000/api/file/uploadfile`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag, img })
        });
        const file = await response.json();
        console.log(file)
        setFiles(files.concat(file))
    }


    const getallfiles = async () => {
        //Api Call
        const url = `http://localhost:5000/api/file/getallfiles`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const test = await response.json();
        setFiles(test)
    }

    return (
        <FileContext.Provider value={{ files, addfile, getallfiles }}>
            {props.children}
        </FileContext.Provider>
    )
}
// console.log(FileState)
export default FileState


