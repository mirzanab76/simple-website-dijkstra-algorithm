
import { Route, Routes } from 'react-router-dom';
import { App } from './App.jsx';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import {Login} from './pages/Login.jsx'
import {LocationList} from './pages/LocationList.jsx'


const Router = () => {
  const routes = useRoutes([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/location', element: <LocationList /> },
  ]);

  return routes;
};

export default Router;
