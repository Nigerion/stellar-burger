// import asyncReducer, { fetchAsyncData } from './asyncSlice';
import {
  ingredientsReducer,
  getIngredientsThunk,
  IngredientsState
} from '../services/slice/ingredietsSlice';
import { configureStore } from '@reduxjs/toolkit';
describe('ingredientsSlice', () => {
  test('should handle getIngredientsThunk.pending', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      }
    });
    store.dispatch(getIngredientsThunk());

    const state = store.getState().ingredients;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should handle getIngredientsThunk.fulfilled', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      }
    });
    const ingredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0
      }
    ];

    store.dispatch(getIngredientsThunk.fulfilled(ingredients, 'fulfilled'));

    const state = store.getState().ingredients;
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
  });
  test('should handle getIngredientsThunk.rejected', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      }
    });
    const error = 'Request failed';
    const name = 'rejected';
    store.dispatch(
      getIngredientsThunk.rejected({ message: error, name: name }, 'rejected')
    );

    const state = store.getState().ingredients;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
});
