import React, { useContext } from 'react'
import NoteContext from './NoteContext'

const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote} = context
    const{note,updateNote} = props
    return (
            <div className="card mx-3 my-3" style={{width:"18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-title">{note.tag}</h6>
                <p className="card-text">{note.description}</p>
                <p className="card-text">Date: {note.date}</p>
                <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                <i className="fa-solid fa-pen-to-square mx-4" onClick={()=>{updateNote(note)}}></i>
            </div>
        </div>
    )
}

export default NoteItem
