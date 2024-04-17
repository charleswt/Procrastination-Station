import ReactDOM from 'react-dom/client';
import '../public/css/style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages imports
import App from './app.jsx'
import Home from './pages/home.jsx'
import Error from './pages/error.jsx'
import Snake from './pages/SnakeGame/SnakeGame.jsx'
import TTT from './pages/ttt.jsx'
import Pong from './pages/pong.jsx'
import Dino from './pages/dino.jsx'

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
            path: '/snake',
            element: <Snake />
          },
          {
            path: '/dino',
            element: <Dino />
          },
          {
            path: '/ttt',
            element: <TTT />
          },
          {
            path: '/pong',
            element: <Pong />
          }
      ]
    }
  ]);
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  )
  