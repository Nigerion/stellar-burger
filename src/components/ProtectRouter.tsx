import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { selectorIsAuth, selectorState } from '../services/slice/userSlice';
import { useSelector } from 'react-redux';
import { Preloader } from './ui/preloader';

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
  const user = useSelector(selectorState).user?.name;
  const from = location.state?.from || { pathname: '/' };
  const backgroundLocation = location.state?.state || null;

  if (!isAuthen && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    return <Navigate to={from} state={{ backgroundLocation }} />;
  }
  return children;
};
