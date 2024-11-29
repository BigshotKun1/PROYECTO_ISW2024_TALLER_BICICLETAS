/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';  // Asegúrate de importar el AuthContext

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();  // Obtén el estado de autenticación

  if (!isAuthenticated) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/auth" />;
  } 
  

  // Si está autenticado, renderiza el componente hijo
  return children;

};

export default PrivateRoute;