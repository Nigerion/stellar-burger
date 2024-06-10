import { configureStore } from '@reduxjs/toolkit';
import {
  feedReducer,
  getFeedsThunk,
  getOrdersThunk
} from '../services/slice/feedSlice';

describe('feedSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        feed: feedReducer
      }
    });
  });

  it('should handle getFeedsThunk.pending', () => {
    store.dispatch(getFeedsThunk.pending(''));
    const state = store.getState().feed;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle getFeedsThunk.rejected', () => {
    const errorMessage = 'Error message';
    const name = 'pending';
    store.dispatch(
      getFeedsThunk.rejected({ message: errorMessage, name: name }, '')
    );
    const state = store.getState().feed;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle getFeedsThunk.fulfilled', () => {
    const payload = {
      orders: [
        {
          _id: '6621181e97ede0001d066467',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный био-марсианский бургер',
          createdAt: '2024-04-18T12:54:54.092Z',
          updatedAt: '2024-04-18T12:54:54.651Z',
          number: 38255
        },
        {
          _id: '6621181197ede0001d066466',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
          status: 'done',
          name: 'Флюоресцентный бургер',
          createdAt: '2024-04-18T12:54:41.452Z',
          updatedAt: '2024-04-18T12:54:42.082Z',
          number: 38254
        },
        {
          _id: '66210ebc97ede0001d06644c',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный бессмертный люминесцентный бургер',
          createdAt: '2024-04-18T12:14:52.012Z',
          updatedAt: '2024-04-18T12:14:52.590Z',
          number: 38253
        }
      ],
      total: 10,
      totalToday: 5,
      success: true
    };
    store.dispatch(getFeedsThunk.fulfilled(payload, ''));
    const state = store.getState().feed;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(payload.total);
    expect(state.totalToday).toBe(payload.totalToday);
  });

  it('should handle getOrdersThunk.pending', () => {
    store.dispatch(getOrdersThunk.pending(''));
    const state = store.getState().feed;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle getOrdersThunk.rejected', () => {
    const errorMessage = 'Error message';
    const name = 'pending';
    store.dispatch(
      getOrdersThunk.rejected({ message: errorMessage, name: name }, '')
    );
    const state = store.getState().feed;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle getOrdersThunk.fulfilled', () => {
    const payload = [
      {
        _id: '6621181e97ede0001d066467',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный био-марсианский бургер',
        createdAt: '2024-04-18T12:54:54.092Z',
        updatedAt: '2024-04-18T12:54:54.651Z',
        number: 38255
      },
      {
        _id: '6621181197ede0001d066466',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2024-04-18T12:54:41.452Z',
        updatedAt: '2024-04-18T12:54:42.082Z',
        number: 38254
      },
      {
        _id: '66210ebc97ede0001d06644c',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный бессмертный люминесцентный бургер',
        createdAt: '2024-04-18T12:14:52.012Z',
        updatedAt: '2024-04-18T12:14:52.590Z',
        number: 38253
      }
    ];
    store.dispatch(getOrdersThunk.fulfilled(payload, ''));
    const state = store.getState().feed;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(payload);
  });
});
