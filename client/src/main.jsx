import ReactDOM from 'react-dom/client';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages imports
import App from './app.jsx'
import Home from './pages/home.jsx'
import Error from './pages/error.jsx'
import Profile from './pages/profile.jsx'

// router set up
const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      error: <Error />,
      children: [
        {
          index: true, 
          element: <Home />
        },
        {
            path: '/profile/:id',
            element: <Profile />
          }
      ]
    }
  ]);
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  )
  