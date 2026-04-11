import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './layout.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children :[
            {
                path: "/news",
                element: <div>News</div>,
              },
              {
                path: "/login",
                element: <div>Login</div>,
              },
            {
                path: "/register",
                element: <div>Register</div>,
              },
    ],
  }  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   
       <RouterProvider router={router} />
  </StrictMode>,
)
