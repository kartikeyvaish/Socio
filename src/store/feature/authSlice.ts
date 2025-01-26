// Packages Imports
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import reduxStorageEngine from '../reduxStoreEngine';

// Named Imports
import { User } from '../../types/model';
import { TOKENS } from '../../constants/ui';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;

      return state;
    },
    reset: (state) => {
      state.user = null;

      reduxStorageEngine.removeItem(TOKENS.ACCESS_TOKEN);
      reduxStorageEngine.removeItem(TOKENS.REFRESH_TOKEN);

      return state;
    },
    logout: (state) => {
      state.user = null;

      reduxStorageEngine.removeItem(TOKENS.ACCESS_TOKEN);
      reduxStorageEngine.removeItem(TOKENS.REFRESH_TOKEN);

      return;
    }
  }
});

export const { setUser, reset, logout } = authSlice.actions;

export default authSlice.reducer;
