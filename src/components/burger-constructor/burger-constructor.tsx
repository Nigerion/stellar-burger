import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearBurger,
  constructorState
} from '../../services/slice/constructorSlice';
import {
  clearOrder,
  orderBurgerThunk,
  userOrderSelector
} from '../../services/slice/userOrderSlice';
import { useNavigate } from 'react-router-dom';
import { selectorIsAuth } from '../../services/slice/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(constructorState).constructorItems;

  const orderRequest = useSelector(userOrderSelector).isLoading;

  const orderModalData = useSelector(userOrderSelector).order;

  const dispatch = useDispatch();
  const nav = useNavigate();
  const isAuth = useSelector(selectorIsAuth);
  const onOrderClick = () => {
    if (!constructorItems.bun || !isAuth) {
      nav('/login');
    } else {
      const order = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      dispatch(orderBurgerThunk(order));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearBurger());
    nav('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
