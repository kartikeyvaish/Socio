// Packages Imports
import * as Yup from "yup";

// validate schema for Reset Password form
const ValidationSchema = () => {
    return Yup.object().shape({
        new_password: Yup.string().required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password must be less than 20 characters"),
        confirm_new_password: Yup.string().oneOf([Yup.ref("new_password"), null], "Passwords must match"),
    });
};

// initial values for Reset Password form
const InitialValues = {
    new_password: "",
    confirm_new_password: "",
};

// exports
export default {
    ValidationSchema,
    InitialValues,
};