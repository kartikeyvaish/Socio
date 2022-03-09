// Packages Imports
import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

// Custom hook to check if the app is in foreground
export const useIsForeground = (): boolean => {
    // Local States
    const [isForeground, setIsForeground] = useState(true);

    // useEffect to handle the app state changes
    useEffect(() => {
        // Listen to the app state changes
        const listener = AppState.addEventListener('change', onChange);

        // Remove the listener here
        return () => listener.remove();
    }, [setIsForeground]);


    // function to execute on app state changes
    // if the app is in background, set isForeground to false
    const onChange = (state: AppStateStatus): void => setIsForeground(state === 'active');

    // Return the isForeground state
    return isForeground;
};