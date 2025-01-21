// Packages Imports
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Named Imports
import { darkTheme, lightTheme } from '../../configs/themes';
import { ThemeProps } from '../../types/global';

export interface ThemeState extends ThemeProps {}

const initialState: ThemeState = lightTheme;

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (_, action: PayloadAction<ThemeProps>) => {
      return action.payload;
    },
    toggleTheme: (state) => {
      if (state.dark) {
        return lightTheme;
      }

      return darkTheme;
    },
    reset: () => {
      return lightTheme;
    }
  }
});

export const {} = themeSlice.actions;

export default themeSlice.reducer;
