import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser, faArrowRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook, faSquareInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';

import logo from '../../assets/img/logo.png';
import './navbar.css';

export default function Navbar({ title }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='announcement'>
        <div className='container h-100'>
          <div className='d-flex align-items-center h-100'>
            <FontAwesomeIcon icon={faSquareFacebook}/>
            <FontAwesomeIcon icon={faSquareInstagram}/>
            <FontAwesomeIcon icon={faSquareXTwitter}/>
          </div>
        </div>
      </div>
      <nav className='navbar'>
        <div className='container'>
          <div className='d-flex w-100'>
            <div className='navbar-logo'>
              <Link to="/">
                <img src={logo} alt='Logo' draggable='false'/>
              </Link>
            </div>
            <div className='navbar-menu'>
              <Link to="/" className={`menu-item ${currentPath === '/' ? 'active' : ''}`}>Inicio</Link>
              <Link to="/products" className={`menu-item ${currentPath === '/products' ? 'active' : ''}`}>Productos</Link>
              <Link to="/about" className={`menu-item ${currentPath === '/about' ? 'active' : ''}`}>Sobre Nosotros</Link>
            </div>
            <div className='navbar-user'>
              <div className="relative d-flex justify-content-center" ref={dropdownRef}>
              <div className="user-profile-icon" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faCircleUser} />
              </div>
                {isOpen && (
                  <div className="pop-in dropdown-menu">
                    <ul>
                      <li>
                        <Link to="/login" className="d-flex align-items-center gap-10" onClick={toggleDropdown}><FontAwesomeIcon icon={faArrowRightToBracket}/>Iniciar sesión</Link>
                      </li>
                      <li>
                        <Link to="/register" className="d-flex align-items-center gap-10" onClick={toggleDropdown}><FontAwesomeIcon icon={faUser}/>Crear una cuenta</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className='shopping-cart-icon'>
                <span className="notification">4</span>
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
