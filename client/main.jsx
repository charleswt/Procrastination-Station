import ReactDOM from 'react-dom/client';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages imports
import Dino from './src/pages/dino.jsx'
import Games  from './src/pages/games.jsx'
import Pong from './src/pages/pong.jsx'
import Snake from './src/pages/snake.jsx'
import TTT from './src/pages/ttt.jsx'
import Error from './src/pages/error.jsx'
import Profile from './src/pages/profile.jsx'

// router set up
const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      error: <Error />,
      children: [
        {
          index: true, 
          element: <Games />
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
  