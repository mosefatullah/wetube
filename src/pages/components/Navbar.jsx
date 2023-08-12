import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='__navbar'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/subscriptions">Subscriptions</Link></li>
        <li><Link to="/watchLater">Watch Later</Link></li>
    </div>
  )
}

export default Navbar