import {
  TRegisterData,
  registerUserApi,
  loginUserApi,
  logoutApi,
  updateUserApi,
  getUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  TLoginData
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types'; // email: string; name: string;
// типизация intitialState
export interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
}
// начальное значение intitialState
const initialState: UserState = {
  isLoading: false,
  user: null,
  error: null,
  isAuth: false
};
// вызов регистрации пользователя
export const registerUserThunk = createAsyncThunk(
  'user/register',
  registerUserApi
);
// Вызов входа пользователя
export const loginUserThunk = createAsyncThunk('user/login', loginUserApi);
//  Вызов выхода пользователя
export const logoutThunk = createAsyncThunk('user/logout', logoutApi);
// Вызов обновления пользователя
export const updateUserThunk = createAsyncThunk('user/update', updateUserApi);
// Вызов получения пользователя
export const getUserThunk = createAsyncThunk('user/get', getUserApi);
//создание слоя
export const userSlise = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      //очистка ошибки , чтобы она не всплывала при повторном запуске (из теории)
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // экшен будет отправлен перед вызовом асинхронной функции, переданной вторым аргументом в createAsyncThunk.(теория)
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true; //говорит что идет загрузка
      state.error = null; // очищает ошибку
      state.isAuth = false;
    }); //экшен будет отправлен, если асинхронная функция завершится с ошибкой. В этом случае в поле error будут содержаться данные об ошибке в формате:interface SerializedError { name?: string message?: string code?: strings tack?: string} (теория)
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.isLoading = false; // получили ответ от сервера
      state.error = action.error.message as string; // записываем ошибку
      state.isAuth = false;
    }); //экшен будет отправлен, если асинхронная функция из второго аргумента завершится без ошибок (в нашем случае если запрос завершится успешно). В этом случае в поле payload этого экшена будут лежать данные, которые вернула асинхронная функция (в нашем случае — массив книг Array<TBook>). (теория)
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.isLoading = false; // получили ответ от сервера
      state.user = action.payload.user; // получаем пользователя
      state.error = null; // очищаем ошибку
      state.isAuth = true; // прошла авотризация
    });
    // ................................Все остальное по аналогии ..................
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true; //говорит что идет загрузка
      state.error = null; // очищает ошибку
      state.isAuth = false;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoading = false; // получили ответ от сервера
      state.error = action.error.message as string; // записываем ошибку
      state.isAuth = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isLoading = false; // получили ответ от сервера
      state.user = action.payload.user; // получаем пользователя
      state.error = null; // очищаем ошибку
      state.isAuth = true; // прошла авотризация
    }); //
    builder.addCase(logoutThunk.pending, (state) => {
      state.isLoading = true; //говорит что идет загрузка
      state.error = null; // очищает ошибку
      state.isAuth = true;
    });
    builder.addCase(logoutThunk.rejected, (state, action) => {
      state.isLoading = false; // получили ответ от сервера
      state.error = action.error.message as string; // записываем ошибку
      state.isAuth = false;
    });
    builder.addCase(logoutThunk.fulfilled, (state, action) => {
      state.isLoading = false; // получили ответ от сервера
      state.user = null; // очищаем пользователя
      state.error = null; // очищаем ошибку
      state.isAuth = false; // прошла авотризация
    }); //
    builder.addCase(updateUserThunk.pending, (state) => {
      state.isLoading = true; //говорит что идет загрузка
      state.error = null; // очищает ошибку
    });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.isLoading = false; // получили ответ от сервера
      state.error = action.error.message as string; // записываем ошибку
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.isLoading = false; // получили ответ от сервера
      state.user = action.payload.user; // получаем пользователя
      state.error = null; // очищаем ошибку
    }); //
    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true; //говорит что идет загрузка
      state.error = null; // очищает ошибку
      state.isAuth = false;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.isLoading = false; // получили ответ от сервера
      state.error = action.error.message as string; // записываем ошибку
      state.isAuth = false;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.isLoading = false; // получили ответ от сервера
      state.user = action.payload.user; // получаем пользователя
      state.error = null; // очищаем ошибку
      state.isAuth = true;
    });
  },
  selectors: {
    selectorState: (state) => state, // вытаскиваем весь state
    selectorUser: (state) => state.user, //вытаскиваем user
    selectorError: (state) => state.error, // вытаскиваем error
    selectorIsAuth: (state) => state.isAuth // вытаскиваем isAuth
  }
});
export const { clearError } = userSlise.actions;
export const { selectorState, selectorUser, selectorError, selectorIsAuth } =
  userSlise.selectors;

export const userReducer = userSlise.reducer;
