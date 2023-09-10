// Packages Imports
import * as Yup from "yup";
import { CONFIRM_PASSWORD_SCHEMA, PASSWORD_SCHEMA } from "../types/YupSchema";

// validate schema for reset password form
const validationSchema = () => {
    return Yup.object().shape({
        password: PASSWORD_SCHEMA,
        confirm_password: CONFIRM_PASSWORD_SCHEMA
    });
};

// initial values for reset password form
const initialValues = {
    password: "",
    confirm_password: ""
};

// exports
export default { validationSchema, initialValues };