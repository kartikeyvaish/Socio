// Package imports
import { useEffect, useRef } from "react";
import { FormikProps } from "formik";

export interface useFormCleanupProps {
    isFocused: boolean;
    resetOnFocus?: boolean;
}

// custom hook to cleanup the form whenver the screen gets focused.
export default function useFormCleanup({ isFocused, resetOnFocus = true }: useFormCleanupProps) {
    // ref for the formik form
    const formRef = useRef<FormikProps<any>>(null);

    // whenever the screen gets focused, reset the form
    useEffect(() => {
        if (isFocused && resetOnFocus) formRef.current?.resetForm();
    }, [isFocused]);

    // returns the ref to the formik form
    return { formRef };
}