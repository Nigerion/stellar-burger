import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: null | string;
}
const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};
export const getIngredientsThunk = createAsyncThunk(
  'ingredients/get',
  getIngredientsApi
);
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    ingredientsState: (state) => state
  },
  extraReducers: (build) => {
    build
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { ingredientsSelector, ingredientsState } =
  ingredientsSlice.selectors;
