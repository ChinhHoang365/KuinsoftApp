import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import Layout from './layout.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from 'pages/admin/login.tsx';
import 'styles/global.css';  
import News from 'pages/client/news.tsx';
import HomePage from 'pages/home/homepage.tsx';
//import RegisterPage from 'pages/client/register.tsx';
import { App } from 'antd';
import { AppProvider } from 'components/context/app.context.tsx';
import ProtectedRoute from 'components/auth';
import LayoutAdmin from './layout.admin.tsx';

const router = createBrowserRouter([
    {
      path: "/",
    //  element: <Layout/>,
     element: <LayoutAdmin/>,
      children :[
        {
          index: true, 
          element:
          (  
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          )
        },
        {
            path: "/news",
            element: 
            (
            <ProtectedRoute>
              <News /> 
            </ProtectedRoute>
          )
           
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
   <App>
    <AppProvider>
       <RouterProvider router={router} />\
    </AppProvider>
    
    </App>
  </StrictMode>,
)
