import React,{useContext, useEffect,useState,useRef} from 'react'
import NoteContext from './NoteContext'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'


const Notes = () => {
  const navigate = useNavigate()
  const context = useContext(NoteContext)
  const {notes,fetchData,editNote} = context
  const [note, setNote] = useState({eid:"",etitle:"",edescription:"",etag:""});

  const ref = useRef(null)
  const updateNote = (currentNote)=>{
    ref.current.click()
    setNote({eid:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  }


  const refClose = useRef(null)
  const handleClick = (e)=>{
      e.preventDefault()
      editNote(note.eid,note.etitle,note.edescription,note.etag)
      refClose.current.click() 
   }

   const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
   }
   
   useEffect(() => {
     if(localStorage.getItem("token")){
       fetchData()
     }
     else{
      navigate("/login")
     }
   })
  return (
    <div>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            </div>
            <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                </div>
            </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} >Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <h2>Your Notes</h2>
      <div className='row my-3'>
      {notes.map((note,index)=>{
        return <NoteItem key={index} note={note} updateNote={updateNote}/>
      })}
      </div>
    </div>
  )
}

export default Notes
