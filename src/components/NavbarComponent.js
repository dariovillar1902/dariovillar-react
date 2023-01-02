import React, { useContext } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import logo from '../assets/favicon.png';
import { DarkModeComponent } from './DarkModeComponent';
import { DarkModeContext } from './darkModeContext';
import { LanguageComponent } from './LanguageComponent';
import { LanguageContext } from './languageContext';

export const NavbarComponent = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);

    return (
        <Navbar bg={darkMode ? 'dark' : 'light'} expand='lg' variant={darkMode ? 'dark' : 'light'} className={'navbar ' + (darkMode ? 'darkNavbar' : 'lightNavbar')}>
            <Navbar.Brand href='/'>
                <Image src={logo} className='logo imgNavbar' alt='logo' />
                <span className="fs-4 textoClaro">
                    Darío Villar
                </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' className='navbar-toggle' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav>
                    <Nav.Link href='/'>{isSpanish ? 'Inicio' : 'Home'} </Nav.Link>
                    <Nav.Link href='/sobremi'> {isSpanish ? 'Sobre Mi' : 'About Me'} </Nav.Link>
                    <Nav.Link href='/portfolio'> Portfolio </Nav.Link>
                    <Nav.Link href='/contacto'> {isSpanish ? 'Contacto' : 'Contact'} </Nav.Link>
                </Nav>
                <DarkModeComponent />
                <LanguageComponent />
            </Navbar.Collapse>
        </Navbar>
    )
}
