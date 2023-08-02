import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const token = localStorage.getItem('token');

  return token ? <Route path={path} element={element} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
