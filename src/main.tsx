import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './layout.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import News from 'pages/client/news.tsx';
import Login from 'pages/admin/login.tsx';
import 'styles/global.css';  

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children :[
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

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   
       <RouterProvider router={router} />
  </StrictMode>,
)
