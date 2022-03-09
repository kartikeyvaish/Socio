// A custom hook that returns the Loading state of the component.
// Also if the Loading is true, and user presses the back button,

// packages Imports
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";

interface useLoadingProps {
    initialValue?: boolean;
}

// back handler will prevent the user from going back to the previous page.
export default function useLoading(props: useLoadingProps = {}) {
    const [Loading, SetLoading] = useState<boolean>(props?.initialValue || false);
    const [Refreshing, SetRefreshing] = useState<boolean>(false);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", HandleBackPress);

        return () => BackHandler.removeEventListener("hardwareBackPress", HandleBackPress);
    }, [HandleBackPress]);

    // handle back press
    function HandleBackPress() {
        if (Loading || Refreshing) {
            return true;
        }

        return false;
    }

    return { Loading, SetLoading, Refreshing, SetRefreshing };
}