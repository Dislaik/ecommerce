import React, { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import './main-layout.css';

export default function MainLayout() {
  return (
    <>
      <header>
        <Navbar title='Store'/>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
