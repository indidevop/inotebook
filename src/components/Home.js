import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'

const Home = () => {

 
  return (
    <div>
      <AddNote/>
      {localStorage.getItem('authtoken')&& <Notes/>}
    </div>
  )
}

export default Home