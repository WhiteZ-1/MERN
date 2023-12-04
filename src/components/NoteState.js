import React,{useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{

  const [notes, setNotes] = useState([]); 

  const host = "http://localhost:5000"
  const authToken = localStorage.getItem("token")
  const fetchData = async ()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "Authorization":authToken
        }
      })
      const data = await response.json()
      setNotes(data)
    }
    


    const addNotes = async (title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Authorization":authToken
        },
        body: JSON.stringify({title, description,tag})
        
      })
        const data = await response.json()
        setNotes(notes.concat(data))
        if (data) {
          props.showAlert(`Note is Added`, 'success');
        } else {
            props.showAlert(`${data.message}`, 'danger');
          }
    }

    const deleteNote = async (id)=>{
      await fetch(`${host}/api/notes/delete/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "Authorization":authToken
        }
      })
      const newNotes = notes.filter((note)=>{return note._id!==id})
      
      props.showAlert("Note has been deleted" , "danger")
      setNotes(newNotes)  
    }

    const editNote = async (id,title,description,tag)=>{
      await fetch(`${host}/api/notes/update/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "Authorization":authToken
        },
        body:JSON.stringify({id,title, description,tag})
      })
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id){
          element.title = title
          element.description = description
          element.tag = tag
        }
        
      }
      
      props.showAlert("Note has been edited" , "info")
    }

    return(
    <NoteContext.Provider value={{notes, addNotes,fetchData,deleteNote,editNote}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState