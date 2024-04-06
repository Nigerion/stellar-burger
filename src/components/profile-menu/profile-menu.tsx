import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutThunk } from '../../services/slice/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  // const nav = useNavigate();
  const handleLogout = () => {
    dispatch(logoutThunk());
    // nav('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
