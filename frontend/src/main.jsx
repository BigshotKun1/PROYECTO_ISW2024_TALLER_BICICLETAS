import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Clientes from '@pages/Clientes';
import Root from '@pages/Root';
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';
import ClientesList from './components/ClientesList';
import PedidoReparacion from '@pages/pedidoReparacion';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error404/>,
    children: [
      {
        index : true,
        element: <Navigate to="/home" />  
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/user',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <Users />
        </ProtectedRoute>
        ),
    },
    {
      path: '/cliente',
      element: (
      <ProtectedRoute allowedRoles={['administrador', 'vendedor']}>
        <Clientes />
      </ProtectedRoute>
      ),
  },
  {
    path: '/cliente/all',
    element: (
    <ProtectedRoute allowedRoles={['administrador', 'vendedor']}>
      <ClientesList />
    </ProtectedRoute>
    ),
},
{
  path: '/pedidoReparacion',
  element: (
  <ProtectedRoute allowedRoles={['administrador', 'vendedor']}>
    <PedidoReparacion />
  </ProtectedRoute>
  ),
}
    ]
  },
  {
    path: '/auth',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)