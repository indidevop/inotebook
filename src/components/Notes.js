import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../contexts/notes/noteContext';
import NoteItem from './NoteItem';

function Notes() {
    let i = 0;
    const context = useContext(noteContext);
    const { notes, fetchallNotes, editNote } = context;
    const ref = useRef(null)
    const refclose = useRef(null)
    const [message, setmessage] = useState("")

    useEffect(() => {
        if(localStorage.getItem('authtoken'))
        {
            setmessage("No notes to display");
            fetchallNotes();
        }
        else{
            setmessage("Login to see your notes");            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [note, setnote] = useState({ eid: "", etitle: "", edesc: "", etag: "" })


    const updateNote = (currentnote) => {
        ref.current.click();
        console.log(currentnote);
        setnote({ eid: currentnote._id, etitle: currentnote.title, edesc: currentnote.description, etag: currentnote.tag })
    }


    const changeHandler = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    }

    const updateindb = () => {
        editNote(note.eid, note.etitle, note.edesc, note.etag);
        refclose.current.click()
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" name='etitle' id="etitle" onChange={changeHandler} placeholder="Today's note" value={note.etitle}  minLength={5} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" name='etag' id="etag" onChange={changeHandler} value={note.etag} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="desc" className="form-label">Description</label>
                                <textarea className="form-control" name='edesc' onChange={changeHandler} id="edesc" rows="3" value={note.edesc} minLength={5} required></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edesc.length<5} className="btn btn-primary" onClick={updateindb}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && message}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={i++} note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes