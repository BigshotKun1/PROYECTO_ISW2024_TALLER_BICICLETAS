import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Clientes from '@pages/Clientes';
import Root from '@pages/Root';
import ProtectedRoute from '@components/ProtectedRoute';
import ClientesList from '@components/ClientesList';
import PedidoReparacion from '@pages/pedidoReparacion';
import EstadisticasTaller from './components/EstadisticasTaller';
import Producto from '@pages/Producto';
import Bicicleta from '@pages/Bicicleta';
import Users from '@pages/Users';
import UsersList from '@components/UsersList';

import '@styles/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/user',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'superadmin']}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: '/user/all', 
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'superadmin']}>
            <UsersList />
          </ProtectedRoute>
        ),
      },
      {
        path: '/productos',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'vendedor']}>
          <Producto />
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
      },
      {
        path: '/estadisticas',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
          <EstadisticasTaller />
          </ProtectedRoute>
        ),
      },
      {
       path: '/bicicleta',
       element: (
         <ProtectedRoute allowedRoles={['administrador', 'vendedor']}>
         <Bicicleta />
         </ProtectedRoute>
       ),
      }
    ]},
  {
    path: '/auth',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);