import React from 'react'
import { Dashboard } from '../components'


const Home = ({curUser}) => {
  return (
    <>
     <div>
      <Dashboard curUser={curUser}/>
     </div>
    </>
  )
}

export default Home