import {
  CaseReducer,
  PayloadAction,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
interface constructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: constructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};
export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  selectors: {
    constructorState: (state) => state
  },
  reducers: {
    addIngredients: (state, action) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else if (
        action.payload.type === 'main' ||
        action.payload.type === 'sauce'
      ) {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: nanoid()
        });
      }
    },

    deleteIngredients: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },
    clearBurger: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    },
    moveUp: (state, action) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload - 1]
      ] = [
        state.constructorItems.ingredients[action.payload - 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },
    moveDown: (state, action) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload + 1]
      ] = [
        state.constructorItems.ingredients[action.payload + 1],
        state.constructorItems.ingredients[action.payload]
      ];
    }
  }
});

export const { constructorState } = constructorSlice.selectors;
export const {
  addIngredients,
  deleteIngredients,
  clearBurger,
  moveUp,
  moveDown
} = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
