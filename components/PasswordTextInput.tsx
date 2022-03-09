// Packages Imports
import { useMemo, useState } from "react";
import { TextInput } from "react-native-paper";

// Component and Types Imports
import AppTextInput from "./AppTextInput";
import { AppTextInputProps } from "../types/ComponentTypes";

// function component for PasswordTextInput
function PasswordTextInput(props: AppTextInputProps) {
  // Local States
  const [Secure, SetSecure] = useState<boolean>(true);

  // useMemo for the Right Icon
  const rightIcon = useMemo(
    () => <TextInput.Icon name={Secure ? "eye" : "eye-off"} onPress={() => SetSecure(!Secure)} />,
    [Secure]
  );

  // render
  return <AppTextInput secureTextEntry={Secure} right={rightIcon} {...props} />;
}

// exports
export default PasswordTextInput;
