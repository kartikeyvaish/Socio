// Packages Imports
import * as Yup from "yup";
import { EMAIL_SCHEMA, PASSWORD_SCHEMA } from "../types/YupSchema";

// validate schema for login form
const validationSchema = () => {
  return Yup.object().shape({
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
  });
};

// initial values for login form
const initialValues = {
  email: "",
  password: "",
};

// exports
export default { validationSchema, initialValues };
