// Packages Imports
import * as Yup from "yup";

// validate schema for Sign Up form
const ValidationSchema = () => {
    return Yup.object().shape({
        name: Yup.string().required().label("Name"),
        email: Yup.string().required("Email is required").email("Invalid Email").label("Email"),
        username: Yup.string().required("Username is required").label("Username"),
        password: Yup.string().required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password must be less than 20 characters"),
        confirm_password: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
    });
};

// initial values for Sign Up form
const InitialValues = {
    name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
};

// exports
export default {
    ValidationSchema,
    InitialValues,
};