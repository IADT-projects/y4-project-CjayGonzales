import React, { useState } from 'react';

/*
import styled from 'styled-components';

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 250px;
  background-color: #fff;
  z-index: 9999;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;

  &.show {
    transform: translateX(0%);
  }
`;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease-in-out;

  &.show {
    opacity: 1;
    pointer-events: auto;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9999;
`;

const NavBar2 = () => {
    const [showNav, setShowNav] = useState(false);

    return (
        <>
            <Button onClick={() => setShowNav(!showNav)}>Toggle Navigation</Button>
            <Overlay className={showNav ? 'show' : ''} onClick={() => setShowNav(false)} />
            <NavWrapper className={showNav ? 'show' : ''}>
                <ul>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                </ul>
            </NavWrapper>
        </>
    );
};

export default NavBar2;

*/

// V2

import "./NavStyles.css";

const NavBar2 = () => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <div className="side-nav-app">
            <button className="open-side-nav-button" onClick={toggleNav}>
                Open Nav
            </button>
            <div className={`side-nav-overlay ${showNav ? "show" : ""}`} onClick={toggleNav}></div>
            <div className={`side-nav-wrapper ${showNav ? "show" : ""}`}>
                <button className="close-side-nav-button" onClick={toggleNav}>
                    Close Nav
                </button>
                <nav className='side-nav'>
                    <ul className="side-nav-ul">
                        <li className='side-nav-li'>Item 1</li>
                        <li className='side-nav-li'>Item 2</li>
                        <li className='side-nav-li'>Item 3</li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default NavBar2;