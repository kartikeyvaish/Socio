// Local imports (components, providers, etc.)
import BackgroundColorProvider from "./providers/BackgroundColorProvider";
import LoginScreen from "./screens/LoginScreen";
import SafeAreaProvider from "./providers/SafeAreaProvider";
import ThemeProvider from "./providers/ThemeProvider";

export default function App() {
  return (
    <BackgroundColorProvider>
      <SafeAreaProvider>
        <ThemeProvider>
          <LoginScreen />
        </ThemeProvider>
      </SafeAreaProvider>
    </BackgroundColorProvider>
  );
}
