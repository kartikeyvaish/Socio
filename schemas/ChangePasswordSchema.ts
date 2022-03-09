// Packages Imports
import * as Yup from "yup";

// validate schema for ChangePassword form
const ValidationSchema = () => {
    return Yup.object().shape({
        current_password: Yup.string().required("Current Password is required"),
        new_password: Yup.string().required("New Password is required").min(6, "New Password must be at least 6 characters").
            max(20, "New Password must be less than 20 characters"),
        confirm_password: Yup.string().oneOf([Yup.ref("new_password"), null], "Passwords must match"),
    });
};

// initial values for ChangePassword form
const InitialValues = {
    current_password: "",
    new_password: "",
    confirm_password: "",
};

// exports
export default {
    ValidationSchema,
    InitialValues,
};