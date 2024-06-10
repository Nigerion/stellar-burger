import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
<<<<<<< HEAD
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = [];

=======
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedsThunk,
  getOrdersSelector
} from '../../services/slice/feedSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);
>>>>>>> review
  return <ProfileOrdersUI orders={orders} />;
};
