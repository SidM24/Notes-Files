import React from 'react'
import Notes from './Notes'
const Home = (props) => {
  const { showAlert } = props
  return (
    <div>
      <div className="container" style={{ width: '100%' }}>
        <Notes showAlert={showAlert}></Notes>
      </div>
    </div>
  )
}

export default Home
