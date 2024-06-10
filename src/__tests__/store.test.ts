import { combineReducers } from '@reduxjs/toolkit';
import { constructorReducer } from '../services/slice/constructorSlice';
import { feedReducer } from '../services/slice/feedSlice';
import { ingredientsReducer } from '../services/slice/ingredietsSlice';
import { orderReducer } from '../services/slice/orderSlice';
import { userOrderReducer } from '../services/slice/userOrderSlice';
import { userReducer } from '../services/slice/userSlice';
import store from '../services/store';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  order: orderReducer,
  user: userReducer,
  constructorBurger: constructorReducer,
  userOrder: userOrderReducer
});
describe('Проверяем правильную настройку и работу rootReducer ', () => {
  test('Проверяем правильную настройку и работу rootReducer', () => {
    expect(rootReducer(store.getState(), { type: 'UNKNOWN_ACTION' })).toEqual(
      store.getState()
    );
  });
});
