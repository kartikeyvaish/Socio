// Imports
import { Appearance } from "react-native";

// types and utils imports
import * as actionTypes from "./actionTypes";
import { ActionProps } from "../../types/StoreTypes";
import { darkTheme, lightTheme } from "../../constants/Themes";
import { ThemeActionPayloadProps } from "./types";
import { AppThemeProps } from "../../types/AppTypes";

// Getting the initial scheme
const defaultScheme = Appearance.getColorScheme();

// Defining the initial state
const initialState: AppThemeProps = defaultScheme === "dark" ? darkTheme : lightTheme;

// Reducer for the theme
const themeReducer = (state = initialState, action: ActionProps<ThemeActionPayloadProps>) => {
    switch (action.type) {
        // Theme Change
        case actionTypes.CHANGE_MODE: {
            if (action.payload?.mode === "dark")
                return darkTheme;

            return lightTheme;
        }

        // Toggle Theme
        case actionTypes.TOGGLE_MODE: {
            if (state.dark)
                return lightTheme;

            return darkTheme;
        }

        // Reset 
        case actionTypes.RESET: {
            const defaultScheme = Appearance.getColorScheme();

            if (defaultScheme === "dark")
                return darkTheme;

            return lightTheme;
        }

        // Default
        default:
            return state;
    }
};

// Exports
export default themeReducer;