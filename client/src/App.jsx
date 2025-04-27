import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import MainLayout from "./layouts/main-layout/main-layout";
import Home from "./pages/home/home";
import AboutUs from "./pages/about-us/about-us";
import Products from './pages/products/products';
import Login from './pages/login/login';
import Register from './pages/register/register';
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener('load', () => {
      setLoading(false);
    });

    if (document.readyState === 'complete') {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading && <LoadingBar/>}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path="" element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="about" element={<AboutUs/>}/>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

const LoadingBar = () => (
  <div className="progress">
    <div className="indeterminate"></div>
  </div>
);



export default App;