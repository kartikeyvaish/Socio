// packages imports
import { useState } from "react";

// custom hook to show bottom sheet
export default function useBottomSheet() {
    // Local States
    const [BottomSheetVisible, SetBottomSheetVisible] = useState(false);
    const [SelectedItem, SetSelectedItem] = useState(null);

    // function to show bottom sheet
    const ShowBottomSheet = () => SetBottomSheetVisible(true);

    // function to hide bottom sheet
    const HideBottomSheet = () => SetBottomSheetVisible(false);

    // return necessary items
    return {
        BottomSheetVisible,
        ShowBottomSheet,
        HideBottomSheet,
        SelectedItem,
        SetSelectedItem
    };
}