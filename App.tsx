// Local component and wrapper imports
import GlobalProvider from "./providers/GlobalProviders";
import NavigationProvider from "./providers/NavigationProvider";
import ThemeProvider from "./providers/ThemeProvider";

// function component for App
function App() {
  // render;
  return (
    <GlobalProvider>
      <ThemeProvider>
        <NavigationProvider />
      </ThemeProvider>
    </GlobalProvider>
  );
}

// exports
export default App;
