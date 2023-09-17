// Local Imports (components/types/utils)
import AppButton, { AppButtonProps } from "../App/AppButton";
import ColorPallete from "../../constants/ColorPallete";
import GoogleIcon from "../Icons/GoogleIcon";

// Named Imports
import { useAppSelector } from "../../store/reduxHooks";

// interface for LoginWithGoogleButton component
export interface LoginWithGoogleButtonProps extends AppButtonProps {}

// functional component for LoginWithGoogleButton
function LoginWithGoogleButton(props: LoginWithGoogleButtonProps) {
  // Get the theme
  const { dark } = useAppSelector(state => state.theme);

  // render
  return (
    <AppButton
      title='Login with Google'
      titleProps={{ color: dark ? ColorPallete.white : ColorPallete.black }}
      leftIcon={<GoogleIcon />}
      backgroundColor={
        dark ? ColorPallete.inputBackgroundColorDark : ColorPallete.inputBackgroundColorLight
      }
      {...props}
    />
  );
}

// exports
export default LoginWithGoogleButton;
