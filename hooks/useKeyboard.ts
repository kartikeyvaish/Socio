// Packages Imports
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

// custom hook to manage keybaord visibility
export function useKeyboard() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true),
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false),
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return isKeyboardVisible;
}
