import React from 'react'
import { useContext } from 'react';
import noteContext from '../contexts/notes/noteContext';
const NoteItem = (props) => {
    const { note,updateNote } = props;
    const {deleteNote}=useContext(noteContext);
    return (
        <div className="col-md-3">

            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                    <h5 className="card-title mb-1">{note.title}</h5>
                    <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-regular fa-pen-to-square mx-1" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                   
                </div>
            </div>
        </div>
    )
}

export default NoteItem