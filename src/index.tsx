import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";

import Header from './components/Header';
import List from './pages/List';
import Create from './pages/Create';
import Home from './pages/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/list/:id",
    element: <List />,
  },
  {
    path: "/create/:id",
    element: <Create />,
  },
  
]);

root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
    
  </React.StrictMode>
);
