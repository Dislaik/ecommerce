import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import MainLayout from "./layouts/main-layout/main-layout";
import Home from "./pages/home/home";
import AboutUs from "./pages/about-us/about-us";
import Category, { categoryLoader } from './pages/category/category';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Product, { productLoader } from './pages/product/product';
import NotFound from './pages/not-found/not-found';
import Categories from './pages/categories/categories';
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/:category",
        element: <Category />,
        loader: categoryLoader,
        errorElement: <NotFound/>
      },
      {
        path: "categories/:category/:product",
        element: <Product />,
        loader: productLoader,
        errorElement: <NotFound/>
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  }
]);

const App = () => {
  return <RouterProvider
  router={router}
  fallbackElement={<div>Cargando…</div>}
/>;
};



export default App;