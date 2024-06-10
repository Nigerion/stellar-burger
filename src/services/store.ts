import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from './slice/ingredietsSlice';
import { feedReducer } from './slice/feedSlice';
import { constructorReducer } from './slice/constructorSlice';
import { userOrderReducer } from './slice/userOrderSlice';
import { userReducer } from './slice/userSlice';
import { orderReducer } from './slice/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  order: orderReducer,
  user: userReducer,
  constructorBurger: constructorReducer,
  userOrder: userOrderReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
