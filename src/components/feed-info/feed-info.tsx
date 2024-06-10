import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
<<<<<<< HEAD
=======
import { useSelector } from '../../services/store';
import {
  getFeedsSelector,
  getOrdersSelector
} from '../../services/slice/feedSlice';
>>>>>>> review

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
<<<<<<< HEAD
  const orders: TOrder[] = [];
  const feed = {};
=======
  const orders: TOrder[] = useSelector(getOrdersSelector);
  const total = useSelector(getFeedsSelector).total;
  const totalToday = useSelector(getFeedsSelector).totalToday;
  const feed = { total, totalToday };
>>>>>>> review

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
