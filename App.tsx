// Local imports (components, providers, etc.)
import BackgroundColorProvider from "./providers/BackgroundColorProvider";
import NavigationProvider from "./providers/NavigationProvider";
import SafeAreaProvider from "./providers/SafeAreaProvider";
import ThemeProvider from "./providers/ThemeProvider";

export default function App() {
  return (
    <BackgroundColorProvider>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationProvider />
        </ThemeProvider>
      </SafeAreaProvider>
    </BackgroundColorProvider>
  );
}
