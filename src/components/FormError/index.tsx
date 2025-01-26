// Packages Imports (from node_modules)
import { useFormikContext } from 'formik';

// Local Imports (components/types/utils)
import AppText from '../AppText';

// interface for FormError component
export interface FormErrorProps {}

// functional component for FormError
function FormError(props: FormErrorProps) {
  // useFormikContext hook
  const { errors } = useFormikContext();

  const error = errors['formError'];

  // render
  return error ? <AppText type="error" text={error} /> : null;
}

// exports
export default FormError;
