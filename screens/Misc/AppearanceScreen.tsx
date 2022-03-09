// Packages Imports
import { useContext } from "react";
import { View, StyleSheet } from "react-native";

// Local Imports
import AppContainer from "../../components/AppContainer";
import AppRadio from "../../components/AppRadio";
import { AppScreenProps } from "../../navigation/NavigationProps";
import AppText from "../../components/AppText";
import FontNames from "../../constants/FontNames";
import ThemeContext from "../../context/ThemeContext";

// function component for AppearanceScreen
function AppearanceScreen(props: AppScreenProps<"AppearanceScreen">) {
  // Get theme Context
  const { ChangeMode, theme } = useContext(ThemeContext);

  // render
  return (
    <AppContainer style={styles.container}>
      <View style={styles.radioMenuContainer}>
        <AppText text="Light" size={20} family={FontNames.PoppinsRegular} />
        <AppRadio checked={theme.dark === false} onPress={() => ChangeMode("light", false)} />
      </View>

      <View style={styles.radioMenuContainer}>
        <AppText text="Dark" size={20} family={FontNames.PoppinsRegular} />
        <AppRadio checked={theme.dark === true} onPress={() => ChangeMode("dark", false)} />
      </View>
    </AppContainer>
  );
}

// exports
export default AppearanceScreen;

// styles
const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  radioMenuContainer: {
    width: "100%",
    height: 50,
    marginBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
