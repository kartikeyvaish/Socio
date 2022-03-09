// Packages Imports
import * as Yup from "yup";

// validate schema for EmailSign form
const ValidationSchema = () => {
    return Yup.object().shape({
        otp: Yup.string().min(6, "OTP must be 6 digits").required("OTP is required").max(6, "OTP must be 6 digits").length(6, "OTP must be 6 digits"),
    });
};

// initial values for EmailSign form
const InitialValues = {
    otp: "",
};

// exports
export default {
    ValidationSchema,
    InitialValues,
};