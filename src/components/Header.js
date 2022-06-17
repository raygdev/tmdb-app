import React from 'react'
import { Link } from 'react-router-dom'
export const Header = (props) => {
  return (
    <header className='header'>
        <h1 className='logo'>TMDB</h1>
        <nav>
            <Link to='/'>HOME</Link>
            <Link to='/watchlist'>WATCHLIST</Link>
        </nav>
    </header>
  )
}
