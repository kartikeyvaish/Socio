// Packages Imports
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Named Imports
import { User } from '../../types/model';

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

      return state;
    },
    logout: (state) => {
      state.user = null;

      return;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, reset, logout } = authSlice.actions;

export default authSlice.reducer;
