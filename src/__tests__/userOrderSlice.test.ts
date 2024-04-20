import { configureStore } from '@reduxjs/toolkit';
import {
  orderBurgerThunk,
  userOrderReducer
} from '../services/slice/userOrderSlice';

describe('userOrderSlice', () => {
  it('should handle orderBurgerThunk.pending', () => {
    const store = configureStore({
      reducer: {
        order: userOrderReducer
      }
    });
    store.dispatch(orderBurgerThunk.pending('', []));
    const state = store.getState().order;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
  it('should handle orderBurgerThunk.rejected', () => {
    const store = configureStore({
      reducer: {
        order: userOrderReducer
      }
    });
    const error = 'Request failed';
    const name = 'rejected';
    store.dispatch(
      orderBurgerThunk.rejected({ message: error, name: name }, '', [])
    );
    const state = store.getState().order;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
  it('should handle getOrderByNumberThunk.fulfilled', () => {
    const store = configureStore({
      reducer: {
        order: userOrderReducer
      }
    });
    const orderData = {
      success: true,
      order: {
        _id: '643ee22945c6f2001be6b43d',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0947',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093c'
        ],
        owner: '643d6756f3361f001c047029',
        status: 'done',
        name: 'Бессмертный space фалленианский минеральный антарианский метеоритный краторный бургер',
        createdAt: '2023-04-18T18:32:09.627Z',
        updatedAt: '2023-04-18T18:32:09.650Z',
        number: 643,
        __v: 0
      },
      name: 'Бессмертный space фалленианский минеральный антарианский метеоритный краторный бургер'
    };
    store.dispatch(orderBurgerThunk.fulfilled(orderData, '', []));
    const state = store.getState().order;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.order).toEqual(orderData.order);
  });
});
