// Packages Imports (from node_modules)
import { memo, useMemo, useState } from "react";
import { RectButton } from "react-native-gesture-handler";
import { ZoomIn, ZoomOut } from "react-native-reanimated";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import AppIcon from "../App/AppIcon";
import TextFieldInput from "./TextFieldInput";
import useFirstRender from "../../hooks/useFirstRender";

// Named Imports
import { TextFieldInputProps } from "../../types/ComponentTypes";

// interface for PasswordInput component
export interface PasswordInputProps extends TextFieldInputProps {}

// functional component for PasswordInput
function PasswordInput(props: PasswordInputProps) {
  // Destructuring props
  const { ...restProps } = props;

  const firstRender = useFirstRender();

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const RenderIconComponent = useMemo(
    () => (
      <RectButton
        style={{ padding: 5, borderRadius: 100 }}
        onPress={() => setPasswordVisible(!passwordVisible)}
      >
        <AnimatedView
          entering={!firstRender ? ZoomIn : null}
          exiting={ZoomOut}
          key={passwordVisible ? "eye" : "eye-off"}
        >
          <AppIcon family='Feather' name={passwordVisible ? "eye" : "eye-off"} size={20} />
        </AnimatedView>
      </RectButton>
    ),
    [passwordVisible]
  );

  // render
  return (
    <TextFieldInput
      iconComponent={RenderIconComponent}
      secureTextEntry={!passwordVisible}
      {...restProps}
    />
  );
}

// exports
export default memo(PasswordInput);
