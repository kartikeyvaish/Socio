// Packages Imports
import * as Yup from "yup";
import { CONFIRM_PASSWORD_SCHEMA, EMAIL_SCHEMA, FIRST_NAME_SCHEMA, LAST_NAME_SCHEMA, PASSWORD_SCHEMA, USERNAME_SCHEMA } from "../types/YupSchema";

// validate schema for login form
const validationSchema = () => {
    return Yup.object().shape({
        first_name: FIRST_NAME_SCHEMA,
        last_name: LAST_NAME_SCHEMA,
        email: EMAIL_SCHEMA,
        username: USERNAME_SCHEMA,
        password: PASSWORD_SCHEMA,
        confirm_password: CONFIRM_PASSWORD_SCHEMA
    });
};

// initial values for login form
const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: ""
};

// exports
export default { validationSchema, initialValues };