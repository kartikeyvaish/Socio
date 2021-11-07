import * as Yup from "yup";

const InitialValues = {
  Email: "",
  NewPassword: "",
  ConfirmNewPassword: "",
  OTP: "",
};

const ForgotPasswordSchema = () => {
  return Yup.object().shape({
    Email: Yup.string().required("Email is required").email(),
    OTP: Yup.string().required("OTP is required").max(6),
    NewPassword: Yup.string()
      .required("New Password is required")
      .min(6)
      .label("New Password"),
    ConfirmNewPassword: Yup.string().oneOf(
      [Yup.ref("NewPassword"), null],
      "Passwords must match"
    ),
  });
};

export default {
  ForgotPasswordSchema,
  InitialValues,
};
