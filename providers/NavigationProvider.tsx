// Packages Imports
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

// Context Imports
import AppContainer from "../components/AppContainer";
import AppNavigator from "../navigation/AppNavigator";
import AuthNavigator from "../navigation/AuthNavigator";
import GlobalContext from "../context/GlobalContext";
import ThemeContext from "../context/ThemeContext";

// function component for NavigationProvider
function NavigationProvider(props) {
  // Destructuring props
  const { children } = props;

  // Get the theme from the context
  const { theme } = useContext(ThemeContext);
  const { User } = useContext(GlobalContext);

  // render
  return (
    <NavigationContainer theme={theme}>
      <AppContainer>
        {User ? <AppNavigator /> : <AuthNavigator />}
        {children}
      </AppContainer>
    </NavigationContainer>
  );
}

// exports
export default NavigationProvider;
