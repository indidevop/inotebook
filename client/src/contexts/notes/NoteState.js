import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  // const host = "http://localhost:5000"
  const host = "https://notebook-backend-52l3.onrender.com"


  const notesInitial = [];

  const [notes, setnotes] = useState(notesInitial);
  

  // Get All Notes
  const fetchallNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem('authtoken'),
          "Content-Type": "application/json"
        }
      })

    const json = await response.json();
    setnotes(json)
    // console.log(json);

  }

  // Add Note
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('authtoken'),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, tag }),
      })
    const note = await response.json();
    setnotes(notes.concat(note))
  }

  const deleteNote = async (id) => {

    const newNotes = notes.filter((note) => { return note._id !== id });
    setnotes(newNotes);

    const response = await fetch(`${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem('authtoken'),
          "Content-Type": "application/json"
        }
      })

    const json = await response.json();
    console.log(json);

  }

  // Edit Note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem('authtoken'),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, tag }),
      })
    const json = await response.json();
    console.log(json);

    //Frontend update
    let newNotes = JSON.parse(JSON.stringify(notes)) // incresed time so that it runs after update
    for (const key in newNotes) {
      if (newNotes[key]._id === id) {
        newNotes[key].title = title;
        newNotes[key].description = description;
        newNotes[key].tag = tag;
        break;
      }
    }
    setnotes(newNotes);

  }

  // Alert functions
  const [alert, setalert] = useState(null)

  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 3000);
  }

  
  const getUser=async (token)=>{
    const response = await fetch(`http://localhost:5000/api/auth/getuser`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token":token
        }
    })

const json = await response.json();
console.log(json);
localStorage.setItem('username',json.name)
}

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchallNotes, alert, showAlert,getUser}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;