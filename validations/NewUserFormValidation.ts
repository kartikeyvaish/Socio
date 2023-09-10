// Packages Imports
import * as Yup from "yup";
import { EMAIL_SCHEMA } from "../types/YupSchema";

// validate schema for new user signup form
const validationSchema = () => {
    return Yup.object().shape({
        email: EMAIL_SCHEMA,
    });
};

// initial values for new user signup form
const initialValues = {
    email: "",
};

// exports
export default { validationSchema, initialValues };