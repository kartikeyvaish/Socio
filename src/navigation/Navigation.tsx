// Packages Imports (from node_modules)
import { NavigationContainer } from '@react-navigation/native';

// Local Imports (components/types/utils)
import AppNavigator from './Appnavigator';
import AuthNavigator from './AuthNavigator';

// Named Imports
import { fontFamilies } from '../constants/ui';
import { useAppSelector } from '../store/storeHooks';

// interface for Navigation component
export interface NavigationProps {}

// functional component for Navigation
function Navigation() {
  const { colors, dark } = useAppSelector((state) => state.theme);
  const { user } = useAppSelector((state) => state.auth);

  // render
  return (
    <NavigationContainer
      theme={{
        colors,
        dark,
        fonts: {
          bold: { fontFamily: fontFamilies.Poppins.bold, fontWeight: 'bold' },
          heavy: { fontFamily: fontFamilies.Poppins.bold, fontWeight: 'bold' },
          medium: { fontFamily: fontFamilies.Poppins.medium, fontWeight: '500' },
          regular: { fontFamily: fontFamilies.Poppins.regular, fontWeight: '400' }
        }
      }}
    >
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

// exports
export default Navigation;
