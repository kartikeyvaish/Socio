// Packages Imports
import * as Yup from "yup";

// validate schema for EditProfile form
const ValidationSchema = () => {
    return Yup.object().shape({
        name: Yup.string().required().label("Name"),
        bio: Yup.string().label("Bio"),
        username: Yup.string().required().label("Username"),
    });
};

// initial values for EditProfile form
const InitialValues = {
    name: "",
    bio: "",
    username: "",
};

// exports
export default {
    ValidationSchema,
    InitialValues,
};