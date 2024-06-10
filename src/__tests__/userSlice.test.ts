import { configureStore } from '@reduxjs/toolkit';
import {
  userSlise,
  registerUserThunk,
  loginUserThunk,
  logoutThunk
} from '../services/slice/userSlice';

describe('userSlice', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userSlise.reducer
      }
    });
  });

  it('should handle registerUserThunk.pending', () => {
    const data = {
      email: 'test@mail.ru',
      name: 'Wow',
      password: 'qwe123'
    };
    store.dispatch(registerUserThunk.pending('', data));

    const { isLoading, error, isAuth } = store.getState().user;
    expect(isLoading).toBe(true);
    expect(error).toBeNull();
    expect(isAuth).toBe(false);
  });

  it('should handle registerUserThunk.rejected', () => {
    const errorMessage = 'An error occurred';
    const data = {
      email: 'test@mail.ru',
      name: 'Wow',
      password: 'qwe123'
    };
    const name = 'rejected';
    store.dispatch(
      registerUserThunk.rejected(
        { message: errorMessage, name: name },
        '',
        data
      )
    );

    const { isLoading, error, isAuth } = store.getState().user;
    expect(isLoading).toBe(false);
    expect(error).toBe(errorMessage);
    expect(isAuth).toBe(false);
  });

  it('should handle registerUserThunk.fulfilled', () => {
    const user = { email: 'test@mail.ru', name: 'Wow' };
    const data = {
      email: 'test@mail.ru',
      name: 'Wow',
      password: 'qwe123'
    };
    store.dispatch(
      registerUserThunk.fulfilled(
        { user, success: true, refreshToken: 'asd123', accessToken: '123asd' },
        '',
        data
      )
    );
    const {
      isLoading,
      user: storedUser,
      error,
      isAuth
    } = store.getState().user;
    expect(isLoading).toBe(false);
    expect(storedUser).toBe(user);
    expect(error).toBeNull();
    expect(isAuth).toBe(true);
  });

  it('should handle loginUserThunk.pending', () => {
    const data = {
      email: 'test@mail.ru',
      password: 'qwe123'
    };
    store.dispatch(loginUserThunk.pending('pending', data));
    expect(store.getState().user.isLoading).toBe(true);
    expect(store.getState().user.error).toBe(null);
    expect(store.getState().user.isAuth).toBe(false);
  });

  it('should handle loginUserThunk.rejected', () => {
    const errorMessage = 'Login failed';
    const data = {
      email: 'test@mail.ru',
      password: 'qwe123'
    };
    const name = 'rejected';
    store.dispatch(
      loginUserThunk.rejected({ message: errorMessage, name: name }, '', data)
    );
    expect(store.getState().user.isLoading).toBe(false);
    expect(store.getState().user.error).toBe(errorMessage);
    expect(store.getState().user.isAuth).toBe(false);
  });

  it('should handle loginUserThunk.fulfilled', () => {
    const user = { email: 'test@mail.ru', name: 'Wow' };
    const data = {
      email: 'test@mail.ru',
      password: 'qwe123'
    };
    store.dispatch(
      loginUserThunk.fulfilled(
        { user, success: true, refreshToken: 'asd123', accessToken: '123asd' },
        '',
        data
      )
    );
    expect(store.getState().user.isLoading).toBe(false);
    expect(store.getState().user.user).toEqual(user);
    expect(store.getState().user.error).toBe(null);
    expect(store.getState().user.isAuth).toBe(true);
  });
  /////////////////////////////////////////////////////////////
  it('should set isLoading to true and isAuth to true when pending', () => {
    const initialState = {
      isLoading: false,
      user: null,
      error: null,
      isAuth: false
    };
    const nextState = userSlise.reducer(initialState, logoutThunk.pending(''));

    expect(nextState.isLoading).toBe(true);
    expect(nextState.isAuth).toBe(true);
  });

  it('should set isLoading to false, error to the action error message, and isAuth to false when rejected', () => {
    const initialState = {
      isLoading: false,
      user: null,
      error: null,
      isAuth: false
    };
    const errorMessage = 'An error occurred';
    const name = 'rejected';

    const nextState = userSlise.reducer(
      initialState,
      logoutThunk.rejected({ message: errorMessage, name: name }, '')
    );

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
    expect(nextState.isAuth).toBe(false);
  });
  it('should set isLoading to false, user to null, error to null, and isAuth to false when fulfilled', () => {
    const initialState = {
      isLoading: true,
      user: { email: 'test@mail.ru', name: 'Wow' },
      error: 'Error message',
      isAuth: true
    };
    const action = { payload: { user: null }, success: true };
    const nextState = userSlise.reducer(
      initialState,
      logoutThunk.fulfilled(action, '')
    );

    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toBe(null);
    expect(nextState.error).toBe(null);
    expect(nextState.isAuth).toBe(false);
  });
  /////////////////////////////////////////////////////////////////
  describe('reducers', () => {
    it('should handle clearError', () => {
      const initialState = {
        isLoading: false,
        user: null,
        error: 'Some error',
        isAuth: false
      };

      const action = { type: 'user/clearError' };

      const state = userSlise.reducer(initialState, action);

      expect(state.error).toBeNull();
    });
  });

  describe('extraReducers', () => {
    it('should handle updateUserThunk.pending', () => {
      const initialState = {
        isLoading: false,
        user: null,
        error: null,
        isAuth: false
      };

      const action = { type: 'user/update/pending' };

      const state = userSlise.reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle updateUserThunk.rejected', () => {
      const initialState = {
        isLoading: true,
        user: null,
        error: null,
        isAuth: false
      };

      const action = {
        type: 'user/update/rejected',
        error: { message: 'Some error' }
      };

      const state = userSlise.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Some error');
    });

    it('should handle updateUserThunk.fulfilled', () => {
      const initialState = {
        isLoading: true,
        user: null,
        error: 'Some error',
        isAuth: false
      };

      const action = {
        type: 'user/update/fulfilled',
        payload: { user: { name: 'John' } }
      };

      const state = userSlise.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual({ name: 'John' });
      expect(state.error).toBeNull();
    });

    it('should handle getUserThunk.pending', () => {
      const initialState = {
        isLoading: false,
        user: null,
        error: null,
        isAuth: false
      };

      const action = { type: 'user/get/pending' };

      const state = userSlise.reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.isAuth).toBe(false);
    });

    it('should handle getUserThunk.rejected', () => {
      const initialState = {
        isLoading: true,
        user: null,
        error: null,
        isAuth: false
      };

      const action = {
        type: 'user/get/rejected',
        error: { message: 'Some error' }
      };

      const state = userSlise.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Some error');
      expect(state.isAuth).toBe(false);
    });

    it('should handle getUserThunk.fulfilled', () => {
      const initialState = {
        isLoading: true,
        user: null,
        error: 'Some error',
        isAuth: false
      };

      const action = {
        type: 'user/get/fulfilled',
        payload: { user: { name: 'John' } }
      };

      const state = userSlise.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual({ name: 'John' });
      expect(state.error).toBeNull();
      expect(state.isAuth).toBe(true);
    });
  });
});
