import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface feedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: null | string;
}
const initialState: feedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};
export const getFeedsThunk = createAsyncThunk('feed/getFeed', getFeedsApi);
export const getOrdersThunk = createAsyncThunk('feed/getOrder', getOrdersApi);
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedsSelector: (state) => state,
    getOrdersSelector: (state) => state.orders
  },
  extraReducers: (build) => {
    build
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
    build
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});
export const feedReducer = feedSlice.reducer;
export const { getFeedsSelector, getOrdersSelector } = feedSlice.selectors;
