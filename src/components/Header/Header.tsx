import './Header.scss'
import tflLogo from '../../images/tfllogo.jpeg'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
    <div className="header">
        <img className= "header__image" src={tflLogo}  alt="Bootstrap Themes" />
        <h1 className="header__heading">Bus Lines</h1>
        <nav className='header__nav header__nav-link--hover'>
            <Link to={`/tfl-vite`}>
                <h1 className='header__nav-items'>Home</h1>
            </Link>
            <Link to={`/tfl-vite/bus-times`}>
                <h1 className='header__nav-items'>Bus Times</h1>
            </Link>
            <Link to={`/tfl-vite/disruptions`}>
                <h1 className='header__nav-items'>Disruptions</h1>
            </Link>
        </nav>
        
    </div>
    <p>Welcome to Transport for London Hub for all travel news. Please select select one of the navigations to receive the latest travel information</p>
        </>
    )
}

export default Header
