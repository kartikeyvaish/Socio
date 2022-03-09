// Packages Imports
import * as Yup from "yup";

// validate schema for login form
const ValidationSchema = () => {
    return Yup.object().shape({
        email: Yup.string().required("Email/Username is required").label("Email/Username"),
        password: Yup.string().required("Password is required"),
    });
};

// initial values for login form
const InitialValues = {
    email: "",
    password: "",
};

// exports
export default {
    ValidationSchema,
    InitialValues,
};