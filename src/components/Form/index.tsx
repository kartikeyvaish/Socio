// Packages Imports (from node_modules)
import { Formik, FormikConfig, FormikHelpers } from 'formik';

export type FormSubmitType<FormValues> = (
  values: FormValues,
  formikHelpers: FormikHelpers<FormValues>
) => Promise<{ ok: boolean; error?: string }>;

export interface FormSubmitProps<FormValues> {
  onSubmit?: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void | Promise<{ ok: boolean; error?: string }>;
}

// interface for Form component
export interface FormProps<FormValues>
  extends Omit<FormikConfig<FormValues>, 'onSubmit'>,
    FormSubmitProps<FormValues> {}

// functional component for Form
function Form<FormValues>(props: FormProps<FormValues>) {
  // Destructuring props
  const { onSubmit, children, ...restProps } = props;

  const submitHandler = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    formikHelpers.setFieldError('formError', undefined);

    if (onSubmit) {
      const formResponse = await onSubmit(values, formikHelpers);

      if (formResponse && formResponse?.ok === false && formResponse?.error)
        formikHelpers.setFieldError('formError', formResponse.error);
    }
  };

  // render
  return (
    <Formik<FormValues> onSubmit={submitHandler} {...restProps}>
      {children}
    </Formik>
  );
}

// exports
export default Form;
