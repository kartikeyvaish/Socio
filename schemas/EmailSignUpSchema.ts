// Packages Imports
import * as Yup from "yup";

// validate schema for EmailSign form
const ValidationSchema = () => {
    return Yup.object().shape({
        email: Yup.string().email().required("Email is required").label("Email"),
    });
};

// initial values for EmailSign form
const InitialValues = {
    email: "",
};

// exports
export default {
    ValidationSchema,
    InitialValues,
};