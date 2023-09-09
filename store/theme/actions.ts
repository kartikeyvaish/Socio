// Packages imports
import { ColorSchemeName } from "react-native";

// Imports
import * as actionTypes from "./actionTypes";
import { ActionProps } from "../../types/StoreTypes";
import { ThemeActionPayloadProps } from "./types";

// Action Creators to Change theme mode
function changeMode(mode: ColorSchemeName): ActionProps<ThemeActionPayloadProps> {
    return {
        type: actionTypes.CHANGE_MODE,
        payload: { mode }
    }
}

// Action Creators: Reset the theme state
function reset(): ActionProps<ThemeActionPayloadProps> {
    return {
        type: actionTypes.RESET,
    }
}

// Action Creators: Toggle the theme mode
function toggleMode(): ActionProps<ThemeActionPayloadProps> {
    return {
        type: actionTypes.TOGGLE_MODE,
    }
}

// Assemble themeActions
const themeActions = { changeMode, reset, toggleMode }

// export the themeActions
export default themeActions;