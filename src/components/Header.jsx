import React, { useRef } from 'react';
import './css/Header.css'
import { Link, useLocation } from 'react-router-dom';

import Clock from "../components/Clock";
import backgroundImage from '../assets/banner.jpg'
import Button from '@mui/material/Button';

import { TiHome } from "react-icons/ti";

import logo from "../assets/telu logo.png"

const Header = () => {
    const detailsRef = useRef(null);
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath === path ? 'button active' : 'button';
    
    const handleLinkClick = () => {
        if (detailsRef.current) {
            detailsRef.current.open = false;
        }
    };

    
    return (
        <>
        <header className='header-container'>
            <div className='clock-container'>
                <Clock/>
            </div>
            <div style={{background: ` url(${backgroundImage})`, objectFit: "unset", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPositionY: "" }} className='kingdom-name' >
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <div className="player-signup">
                    <p>Are You A Player</p>
                    {/* <Link to='/player-signup'>Join Us</Link> */}
                    <a target='_blank' href='https://player.telufootballclub.com/'>Join Us</a>
                </div>
            </div>
            <div className='nav-bar'>
                <div className='desktop-nav'>
                    <div><Button component={Link} to='/' className='button active'><TiHome size={23} /></Button></div>
                    <div><Button component={Link} to='/' className={isActive('/')}>Home</Button></div>
                    <div><Button component={Link} to='/blogs' className={isActive('/blogs')}>News</Button></div>
                    {/* <div><Button component={Link} to='/players' className={isActive('/players')}>Players</Button></div> */}
                    <div><Button component={Link} to='/gallery' className={isActive('/gallery')}>Gallery</Button></div>
                </div>

                <div className='mobile-nav'>
                    <details ref={detailsRef}>
                    <summary>☰ Menu</summary>
                    <div className='mobile-menu'>
                        <Button component={Link} to='/' className={isActive('/')} onClick={handleLinkClick}><TiHome size={24} /> Home</Button>
                        {/* <Button component={Link} to='/oluwo' className={isActive('/oluwo')} onClick={handleLinkClick}>OLUWO OF IWO LAND</Button> */}
                        {/* <Button component={Link} to='/iwo-land' className={isActive('/iwo-land')}>Iwo Land</Button> */}
                        <Button component={Link} to='/blogs' className={isActive('/blogs')} onClick={handleLinkClick}>News</Button>
                        {/* <Button component={Link} to='/players' className={isActive('/players')} onClick={handleLinkClick}>Players</Button> */}
                        <Button component={Link} to='/gallery' className={isActive('/gallery')} onClick={handleLinkClick}>Gallery</Button>
                        {/* <Button component={Link} to='/resources' className={isActive('/resources')}>RESOURCES AND HELP</Button> */}
                    </div>
                    </details>
                </div>
            </div>
        </header>
        </>
    );
}


export default Header