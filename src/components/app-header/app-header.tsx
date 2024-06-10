import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectorUser } from '../../services/slice/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(selectorUser)?.name;
  return <AppHeaderUI userName={userName} />;
};
