// Packages Imports (from node_modules)
import AnimatedText from "../Animated/AnimatedText";
import { FadeIn, FadeOut, Layout } from "react-native-reanimated";

// Local Imports (components/types/utils)
import ColorPallete from "../../constants/ColorPallete";

// Named Imports
import { AnimatedTextProps } from "../../types/ComponentTypes";

// interface for ErrorText component
export interface ErrorTextProps extends Omit<AnimatedTextProps, "text"> {
  error?: string;
}

// functional component for ErrorText
function ErrorText(props: ErrorTextProps) {
  // Destructuring props
  const { error, ...otherProps } = props;

  if (!error) return null;

  // render
  return (
    <AnimatedText
      entering={FadeIn}
      exiting={FadeOut}
      layout={Layout}
      text={error}
      color={ColorPallete.danger}
      size={12}
      {...otherProps}
    />
  );
}

// exports
export default ErrorText;
