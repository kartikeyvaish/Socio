// Packages Imports
import * as Yup from "yup";

export const NAME_SCHEMA = Yup.string().required("Name is required").label("Name");

export const FIRST_NAME_SCHEMA = Yup.string().required("First Name is required").label("First Name");

export const LAST_NAME_SCHEMA = Yup.string().required("Last Name is required").label("Last Name");

export const EMAIL_SCHEMA = Yup.string().email("Should be a valid email").required("Email is required").label("Email")

export const USERNAME_SCHEMA = Yup.string().required("Username is required").label("Username")

export const PASSWORD_SCHEMA = Yup.string().required("Password is required").label("Password")

export const CONFIRM_PASSWORD_SCHEMA = Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm Password is required")
