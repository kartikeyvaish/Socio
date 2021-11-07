import * as Yup from "yup";

const InitialValues = {
  Name: "",
  Username: "",
  Password: "",
  ConfirmPassword: "",
};

const SignUpInitialValues = {
  Email: "",
};

const EmailSignUpSchema = () => {
  return Yup.object().shape({
    Email: Yup.string().required("Email is required").email(),
  });
};

const RegisterSchema = () => {
  return Yup.object().shape({
    Name: Yup.string().required("Name is required"),
    Username: Yup.string().required("Username is required"),
    Password: Yup.string().required("Password is required").min(6),
    ConfirmPassword: Yup.string().oneOf(
      [Yup.ref("Password"), null],
      "Passwords must match"
    ),
  });
};

export default {
  RegisterSchema,
  InitialValues,
  EmailSignUpSchema,
  SignUpInitialValues,
};
