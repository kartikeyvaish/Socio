import { useEffect, useRef } from "react";

/**
 * Custom Hook to manage the first render of a component
 * @returns {boolean} - true if it is the first render, false otherwise
 */
export default function useFirstRender(): boolean {
    const firstRender = useRef(true);

    useEffect(() => {
        firstRender.current = false;
    }, []);

    return firstRender.current;
}