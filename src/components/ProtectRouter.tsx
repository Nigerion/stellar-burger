import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectorIsAuth, selectorState } from '../services/slice/userSlice';

import { Preloader } from './ui/preloader';
import { useSelector } from '../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};
export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthen = useSelector(selectorIsAuth);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  if (!isAuthen && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && isAuthen) {
    return <Navigate to={from} />;
  }
  return children;
};
