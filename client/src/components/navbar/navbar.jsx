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

  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
      setIsUserOpen(false);
    }
    if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
      setIsCategoriesOpen(false);
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

              <div
                className={`menu-item dropdown ${isCategoriesOpen ? 'open' : ''}`}
                ref={categoriesDropdownRef}
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <div className={`dropdown-toggle ${currentPath.startsWith('/categories') ? 'active' : ''}`}>
                  Categorias
                </div>
                {isCategoriesOpen && (
                  <div className="pop-in dropdown-menu">
                    <ul>
                      <li><Link to="/categories/notebook" onClick={() => setIsCategoriesOpen(false)}>Notebooks</Link></li>
                      <li><Link to="/categories/mouse" onClick={() => setIsCategoriesOpen(false)}>Mouses</Link></li>
                      <li><Link to="/categories/keyboard" onClick={() => setIsCategoriesOpen(false)}>Teclados</Link></li>
                    </ul>
                  </div>
                )}
              </div>

              <Link to="/about" className={`menu-item ${currentPath === '/about' ? 'active' : ''}`}>Sobre Nosotros</Link>
            </div>

            <div className='navbar-user'>
              <div className="relative d-flex justify-content-center" ref={userDropdownRef}>
                <div className="user-profile-icon" onClick={() => setIsUserOpen(prev => !prev)}>
                  <FontAwesomeIcon icon={faCircleUser} />
                </div>
                {isUserOpen && (
                  <div className="pop-in dropdown-menu">
                    <ul>
                      <li>
                        <Link to="/login" onClick={() => setIsUserOpen(false)}>
                          <FontAwesomeIcon icon={faArrowRightToBracket}/> Iniciar sesión
                        </Link>
                      </li>
                      <li>
                        <Link to="/register" onClick={() => setIsUserOpen(false)}>
                          <FontAwesomeIcon icon={faUser}/> Crear una cuenta
                        </Link>
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
