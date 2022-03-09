// Packages Imports
import { useState } from "react";

// Local imports
import ColorPallete from "../constants/ColorPallete";

// custom hook to use the Snack Bar globally
export default function useSnackBar() {
    // local state
    const [SnackVisible, SetSnackVisible] = useState<boolean>(false);
    const [Color, SetColor] = useState<string>(ColorPallete.danger);
    const [Message, SetMessage] = useState<string>("");

    // function to show the snack bar
    function showSnack({ message, color }: { message?: string; color?: string }) {
        SetMessage(message ?? "");
        SetColor(color ?? ColorPallete.danger);
        SetSnackVisible(true);
    }

    // function to hide the snack bar
    function hideSnack() {
        SetSnackVisible(false);
        SetColor(ColorPallete.danger);
        SetMessage("");
    }

    // Return necessary values
    return { showSnack, hideSnack, SnackVisible, SetSnackVisible, Color, Message };
} 