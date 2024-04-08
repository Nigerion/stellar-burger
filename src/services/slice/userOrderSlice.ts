import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IOrderSliceState {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IOrderSliceState = {
  order: null,
  isLoading: false,
  error: null
};

export const orderBurgerThunk = createAsyncThunk(
  'postOrder/fetchOrderBurgerApi',
  async (data: string[]) => orderBurgerApi(data)
);
export const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    userOrderSelector: (state) => state
  },
  extraReducers: (build) => {
    build
      .addCase(orderBurgerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.error = null;
        state.order = action.payload.order;
        state.isLoading = false;
      });
  }
});

export const userOrderReducer = userOrderSlice.reducer;
export const { userOrderSelector } = userOrderSlice.selectors;
export const { clearOrder } = userOrderSlice.actions;
