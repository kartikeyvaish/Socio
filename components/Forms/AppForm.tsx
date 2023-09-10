// Packages Imports
import { forwardRef, Ref } from "react";
import { Formik, FormikProps } from "formik";

// Local Imports
import useFormCleanup from "../../hooks/useFormCleanup";

// Types import
import { AppFormProps } from "../../types/FormTypes";

// function component for AppForm
const AppForm = forwardRef((props: AppFormProps, ref: Ref<FormikProps<any>>) => {
  // Destructuring props
  const {
    initialValues,
    onSubmit,
    validationSchema,
    children,
    isFocused = false,
    resetOnFocus = true,
    validate,
  } = props;

  // form custom hook
  const { formRef } = useFormCleanup({ isFocused, resetOnFocus });

  // render
  return (
    <Formik
      innerRef={ref ? ref : formRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validate={validate}
    >
      {() => <>{children}</>}
    </Formik>
  );
});

// exports
export default AppForm;
