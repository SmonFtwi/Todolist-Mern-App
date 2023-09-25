import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App';
import Register from "./pages/register";
import Login from "./pages/login";
import Todo from './pages/todo';


const Router = () => {
    const router = createBrowserRouter ([
        {path:'/',
        element: <App/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: 'register',
        element: <Register/>
    },
    {
        path:'todo',
        element:<Todo/>
    }
    ])

    return <RouterProvider router={router}/>
}

export default Router;