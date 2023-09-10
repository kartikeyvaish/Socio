// Packages Imports
import * as Burnt from "burnt";
import { ToastOptions } from "burnt/build/types";

export function showToast(props?: ToastOptions) {
    Burnt.toast({
        ...props,
        duration: 2,
    });
}


export function showErrorToast(title: string, withHaptics = true) {
    showToast({
        title: title,
        preset: "error",
        haptic: withHaptics ? "error" : 'none',
    });
}