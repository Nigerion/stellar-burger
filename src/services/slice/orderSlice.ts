import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface orderState {
  error: null | string;
  isLoading: boolean;
  order: TOrder[];
}
const initialState: orderState = {
  error: null,
  isLoading: false,
  order: []
};

export const getOrderByNumberThunk = createAsyncThunk(
  'oreder/getOrderNumber',
  (data: number) => getOrderByNumberApi(data)
);
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    orderSelector: (state) => state
  },
  extraReducers: (build) => {
    build
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.order = action.payload.orders;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { orderSelector } = orderSlice.selectors;
