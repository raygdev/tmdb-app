import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Header.module.css"
export const Header = (props) => {
  return (
    <header className={styles.header}>
        <h1 className={styles.logo}>TMDB</h1>
        <nav className={styles.nav}>
            <Link className={styles.a} to='/'>HOME</Link>
            <Link className={styles.a} to='/watchlist'>WATCHLIST</Link>
        </nav>
    </header>
  )
}
