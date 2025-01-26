// Packages Imports (from node_modules)
import { ActivityIndicator, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

// Local Imports (components/types/utils)
import AppText from '../AppText';
import AnimatedView from '../AnimatedView';
import colorPallete from '../../constants/colorPallete';

// Named Imports
import { variables } from '../../constants/ui';

// interface for Button component
export interface ButtonProps extends Omit<RectButtonProps, 'onPress'> {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

// functional component for Button
function Button(props: ButtonProps) {
  // Destructuring props
  const { label, loading, disabled, onPress, ...restProps } = props;

  // render
  return (
    <RectButton
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      {...restProps}
    >
      {loading ? (
        <AnimatedView>
          <ActivityIndicator animating={loading} color={colorPallete.white} />
        </AnimatedView>
      ) : null}

      <AnimatedView>
        <AppText text={label} color={colorPallete.white} size={16} />
      </AnimatedView>
    </RectButton>
  );
}

// exports
export default Button;

// styles for Button
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    borderRadius: variables.borderRadius.large,
    backgroundColor: colorPallete.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: variables.gap.small
  },
  disabled: {
    opacity: 0.6
  }
});
