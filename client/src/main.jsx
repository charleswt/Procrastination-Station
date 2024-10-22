import ReactDOM from 'react-dom/client';
import '../public/css/style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages imports
import App from './app.jsx'
import Home from './pages/home.jsx'
import Error from './pages/error.jsx'
import Snake from './pages/SnakeGame.jsx'
import TTT from './pages/ttt.jsx'
import Dino from './pages/dino.jsx'
import Terms from './pages/terms.jsx'
import Contact from './pages/contact.jsx'
import Success from './pages/success.jsx'

// router set up
const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <Error />,
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
            path: '/terms',
            element: <Terms />
          },
          {
            path: '/contact',
            element: <Contact />
          },
          {
            path: '/success',
            element: <Success />
          }
      ]
    }
  ]);
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  )
  