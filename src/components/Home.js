import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'

const Home = () => {

  return (
    <>
    <div className='container my-5'>
        <AddNote />
        <Notes />
    </div>
    </>
  )
}

export default Home
