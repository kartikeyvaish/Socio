// Packages Imports (from node_modules)
import { StyleProp, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';

// Local Imports (components/types/utils)
import Animated from 'react-native-reanimated';
import AppText from '../AppText';
import colorPallete from '../../constants/colorPallete';
import Flex from '../Flex';

// Named Imports
import { fontFamilies } from '../../constants/ui';
import { useAppSelector } from '../../store/storeHooks';

// interface for OTPInput component
export interface OTPInputProps extends TextInputProps {
  length?: number;
  value?: string;
  onChangeText?: (otp: string) => void;
}

// functional component for OTPInput
function OTPInput(props: OTPInputProps) {
  // Destructuring props
  const { length = 6, value = '', onChangeText, ...textInputProps } = props;

  const { dark } = useAppSelector((state) => state.theme);

  const digitBoxStyles: StyleProp<ViewStyle> = {
    backgroundColor: dark ? colorPallete.darkModeBlack : colorPallete.surfaceGrey
  };

  // render
  return (
    <Flex style={styles.container}>
      {new Array(length).fill(0).map((_, index) => (
        <Animated.View style={[styles.digitBox, digitBoxStyles]} key={index}>
          <AppText text={value?.[index] || ''} size={20} family={fontFamilies.Poppins.bold} />
        </Animated.View>
      ))}

      <TextInput
        {...textInputProps}
        style={styles.input}
        caretHidden={true}
        selectTextOnFocus={false}
        selectionColor="transparent"
        selectionHandleColor="transparent"
        cursorColor="transparent"
        underlineColorAndroid="transparent"
        placeholderTextColor="transparent"
        maxLength={length}
        onChangeText={onChangeText}
        value={value}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
      />
    </Flex>
  );
}

// exports
export default OTPInput;

// styles for OTPInput
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 66,
    gap: 16,
    flexDirection: 'row'
  },
  digitBox: {
    maxWidth: 51,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: 'transparent'
  }
});
