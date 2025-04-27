import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faSquareInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import './breadcrum.css';

export default function Breadcrumb({ title }) {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(x => x);

  {pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;

    return (
      <li
        key={to}
        className={`breadcrumb-item ${isLast ? 'active' : ''}`}
        {...(isLast ? { 'aria-current': 'page' } : {})}
      >
        {isLast ? (
          decodeURIComponent(value)
        ) : (
          <Link to={to}>{decodeURIComponent(value)}</Link>
        )}
      </li>
    );
  })}
}