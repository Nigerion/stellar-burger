import {
  getOrderByNumberThunk,
  orderReducer
} from '../services/slice/orderSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('orderSlice', () => {
  it('should handle getOrderByNumberThunk.pending', () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
    store.dispatch(getOrderByNumberThunk.pending('', 1));
    const state = store.getState().order;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
  it('should handle getOrderByNumberThunk.rejected', () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
    const error = 'Request failed';
    const name = 'rejected';
    store.dispatch(
      getOrderByNumberThunk.rejected({ message: error, name: name }, '', 1)
    );
    const state = store.getState().order;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
  it('should handle getOrderByNumberThunk.fulfilled', () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
    const orderData = {
      success: true,
      orders: [
        {
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
        }
      ]
    };
    store.dispatch(getOrderByNumberThunk.fulfilled(orderData, '', 1));
    const state = store.getState().order;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.order).toEqual(orderData.orders);
  });
});
