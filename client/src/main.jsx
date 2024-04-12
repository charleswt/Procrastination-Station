import ReactDOM from 'react-dom/client';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages imports
import Home from './pages/home.jsx'
import Dino from './pages/dino.jsx'
import Pong from './pages/pong.jsx'
import Snake from './pages/snake.jsx'
import TTT from './pages/ttt.jsx'
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
          },
        {
          path: '/snake',
          element: <Snake />
        }, {
          path: '/pong',
          element: <Pong />
        }, {
          path: '/dino',
          element: <Dino />
        },
        {
            path: '/ttt',
            element: <TTT />
          }
      ]
    }
  ]);
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  )
  