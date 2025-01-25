// Packages Imports
import { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TextInput,
  TextInputProps,
  ViewStyle
} from 'react-native';

// Local Imports
import colorPallete from '../../constants/colorPallete';
import Flex from '../Flex';
import Icon from '../Icon';

// Named Imports
import { AppIconProps } from '../../types/components';
import { useAppSelector } from '../../store/storeHooks';
import { fontFamilies, variables } from '../../constants/ui';

// interface for Input component
export interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
  disabled?: boolean;
  appIconProps?: AppIconProps;
}

// functional component for Input
function Input(props: InputProps) {
  // Destructuring props
  const {
    icon = null,
    secureTextEntry = false,
    disabled,
    appIconProps = null,
    ...restProps
  } = props;

  const { colors, dark } = useAppSelector((state) => state.theme);

  // Local States
  const [valueVisible, setValueVisible] = useState(!secureTextEntry);

  const inputStyles: StyleProp<TextStyle> = [styles.inputStyles, {}];

  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    {
      backgroundColor: dark ? 'transparent' : colorPallete.grey98,
      borderColor: dark ? colorPallete.placeholderDark : colorPallete.placeholderLight
    }
  ];

  const toggleValueVisibility = () => setValueVisible((prev) => !prev);

  return (
    <Flex align="center" gap={14} row style={containerStyles}>
      {appIconProps ? <Icon {...appIconProps} /> : icon ? icon : null}

      <TextInput
        style={inputStyles}
        placeholderTextColor={dark ? colorPallete.placeholderDark : colorPallete.placeholderLight}
        cursorColor={colors.text}
        selectionHandleColor={colors.primary}
        secureTextEntry={secureTextEntry && !valueVisible}
        editable={!disabled}
        {...restProps}
      />

      {secureTextEntry ? (
        valueVisible ? (
          <Icon family="Feather" name="eye-off" size={21} onPress={toggleValueVisibility} />
        ) : (
          <Icon family="Feather" name="eye" size={21} onPress={toggleValueVisibility} />
        )
      ) : null}
    </Flex>
  );
}

// exports
export default Input;

// styles for Input
const styles = StyleSheet.create({
  container: {
    borderRadius: variables.borderRadius.medium,
    padding: 10,
    borderWidth: 1
  },
  inputStyles: {
    flex: 1,
    fontSize: variables.fontSize.medium,
    fontFamily: fontFamilies.Poppins.regular,
    fontStyle: 'normal',
    includeFontPadding: false
  }
});
