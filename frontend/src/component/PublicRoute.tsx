import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PublicRouteProps {
  path: string;
  element: React.ReactNode;
  restricted: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ path, element, restricted }) => {
  const token = localStorage.getItem('token');

  return restricted && token ? <Navigate to="/home" replace /> : <Route path={path} element={element} />;
};

export default PublicRoute;
