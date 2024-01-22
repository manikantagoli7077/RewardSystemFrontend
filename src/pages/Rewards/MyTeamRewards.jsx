import React from 'react'
import Sidebar from '../../components/Sidebar'
import comingsoon from '../../images/comingsoon.png'
const MyTeamRewards = () => {
  return (
    <div style={{marginLeft:'20%'}}>
        <Sidebar/>
      {/* My Team Rewards */}
      <img src={comingsoon} width={500}/>
    </div>
  )
}

export default MyTeamRewards
