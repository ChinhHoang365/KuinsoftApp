import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './layout.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from 'pages/admin/login.tsx';
import 'styles/global.css';  
import News from 'pages/client/news.tsx';
import HomePage from 'pages/client/home.tsx';
import RegisterPage from 'pages/client/register.tsx';
import { App } from 'antd';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children :[
        {
          index: true, 
          element: <HomePage />
        },
        {
            path: "/news",
            element: <News /> 
         },

      ],
    } ,
      {
      path: "/login",
      element: <Login />
},
      {
      path: "/register",
      element: <RegisterPage />
},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <App>
       <RouterProvider router={router} />
    </App>
  </StrictMode>,
)
