import * as Yup from "yup";

const InitialValues = {
    CurrentPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
};

const ChangePasswordSchema = () => {
    return Yup.object().shape({
        CurrentPassword: Yup.string()
            .required("Current Password is required")
            .label("Current Password"),
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
    ChangePasswordSchema,
    InitialValues,
};
