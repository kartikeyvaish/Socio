// Packages Imports
import * as Yup from "yup";

// validate schema for NewPost form
const ValidationSchema = () => {
    return Yup.object().shape({
        caption: Yup.string(),
        location: Yup.string(),
    });
};

// initial values for NewPost form
const InitialValues = {
    caption: "",
    location: "",
};

// exports
export default {
    ValidationSchema,
    InitialValues,
};