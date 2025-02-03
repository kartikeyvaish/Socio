// Packages Imports (from node_modules)
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Named Imports
import { ChildrenProps } from '../types/global';
import { useAppSelector } from '../store/storeHooks';

// interface for AppSafeAreaProvider component
export interface AppSafeAreaProviderProps extends ChildrenProps {}

// functional component for AppSafeAreaProvider
function AppSafeAreaProvider(props: AppSafeAreaProviderProps) {
  // Destructuring props
  const { children } = props;

  const { colors } = useAppSelector((state) => state.theme);

  // render
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </SafeAreaProvider>
  );
}

// exports
export default AppSafeAreaProvider;
