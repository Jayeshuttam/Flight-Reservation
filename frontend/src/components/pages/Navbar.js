import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdFlightTakeoff } from 'react-icons/md'
import './Navbar.css';
import Button from './Button';

import { IconContext } from 'react-icons/lib';
function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [isLogin, setIsLogin] = useState(false);



    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }
    useEffect(() => {
        let uid = localStorage.getItem('uid');
        console.log("uid=>", uid);
        if (uid != undefined) {
            setIsLogin(true);
        }
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className='navbar'>
                    <div className='navbar-container container'>

                        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                            <MdFlightTakeoff className='navbar-icon' />
                       Flickr
                   </Link>
                        <div className="menu-icon" onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/flights' className='nav-links' onClick={closeMobileMenu}>Flight</Link>
                            </li>
                           
                            <li className='nav-item'>
                                <Link to='/My-Bookings' className='nav-links' onClick={closeMobileMenu}>My Bookings</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/feedback' className='nav-links' onClick={closeMobileMenu}>Contact</Link>
                            </li>
                            {
                                !isLogin ?
                                    <li className='nav-btn'>
                                        {button ? (<Link to='/SignUp' className='btn-link' >
                                            <Button buttonStyle='btn--outline'>Sign Up</Button>
                                        </Link>) : (<Link to='/SignUp' className='btn-link' onClick={closeMobileMenu}>
                                            <Button buttonStyle='btn--outline'
                                                buttonSize='btn--mobile'>Sign Up</Button>
                                        </Link>)}
                                    </li>
                                    : ''
                            }
                            {
                                !isLogin ?
                                    <li className='nav-btn'>
                                        {button ? (<Link to='/Login' className='btn-link' >
                                            <Button buttonStyle='btn--outline'>Login</Button>
                                        </Link>) : (<Link to='/Login' className='btn-link' onClick={closeMobileMenu}>
                                            <Button buttonStyle='btn--outline'
                                                buttonSize='btn--mobile'>Login</Button>
                                        </Link>)}
                                    </li>
                                    : ''
                            }

                            {
                                isLogin ?
                                    <li className='nav-btn'>
                                        {button ? (<Link to='/Logout' className='btn-link' >
                                            <Button buttonStyle='btn--outline'>Logout</Button>
                                        </Link>) : (<Link to='/Logout' className='btn-link' onClick={closeMobileMenu}>
                                            <Button buttonStyle='btn--outline'
                                                buttonSize='btn--mobile'>Logout</Button>
                                        </Link>)}
                                    </li>
                                    : ''
                            }

                        </ul>
                    </div>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar

