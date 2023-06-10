import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import noteContext from '../contexts/notes/noteContext';

function AddNote() {
    const context=useContext(noteContext);
    const {addNote,showAlert}=context;

    const [note, setnote] = useState({title:"",desc:"",tag:""})

    const handleClick=()=>{

        if(localStorage.getItem('authtoken'))
         {addNote(note.title,note.desc,note.tag);
         setnote({title:"",desc:"",tag:""})}
         else{
           showAlert("Login to add notes", "primary")
         }
    }

    const changeHandler=(e)=>{
       setnote({...note,[e.target.name]:e.target.value});

    }
    return (
        <div className="container my-3">
            <h2>Add a note</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" name='title' id="title" onChange={changeHandler}placeholder="Today's note"  minLength={5} required value={note.title}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" name='tag' id="tag" onChange={changeHandler}  value={note.tag}/>
            </div>
            <div className="mb-3">
                <label htmlFor="desc" className="form-label">Description</label>
                <textarea className="form-control" name='desc' onChange={changeHandler} id="desc" rows="3" minLength={5} required value={note.desc}></textarea>
            </div>
            <button type='submit' disabled={note.title.length<5 || note.desc.length<5} className="btn btn-primary" onClick={handleClick}>Add</button>
        </div>
    )
}

export default AddNote