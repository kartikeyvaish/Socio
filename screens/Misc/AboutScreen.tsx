// Packages Imports
import { View, StyleSheet, ScrollView, Linking } from "react-native";

// Local Imports
import AppContainer from "../../components/AppContainer";
import AppIcon from "../../components/AppIcon";
import AppImage from "../../components/AppImage";
import AppText from "../../components/AppText";
import ColorPallete from "../../constants/ColorPallete";
import env from "../../config/env";
import FontNames from "../../constants/FontNames";
import IconNames from "../../constants/IconNames";
import Layout from "../../constants/Layout";

// Constants
const about_app = env.about_socio;
const about_owner = env.about_owner;
const app_logo = env.app_logo;
const developer_image = env.developer_image;
const LOGO_SIZE = Layout.window.width / 2.5;
const owner_email = env.owner_email;
const owner_github = env.owner_github;
const owner_stackoverflow = env.owner_stackoverflow;
const owner_linkedin = env.owner_linkedin;

// function component for AboutScreen
function AboutScreen() {
  // function to handle onPress of email
  const onMailPress = (email: string) => Linking.openURL(`mailto:${email}`);

  // function to handle onPress of github, stackoverflow and linkedin
  const openUrl = (link: string) => Linking.openURL(link);

  // render
  return (
    <AppContainer style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <AppImage uri={app_logo} style={{ width: LOGO_SIZE, height: LOGO_SIZE }} />

        <AppText
          text={env.application_name}
          family={FontNames.BerkshireSwash}
          size={50}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        />

        <AppText
          text={env.application_tag_line}
          size={18}
          family={FontNames.PoppinsRegular}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          marginBottom={20}
        />

        <AppText text={about_app} size={15} family={FontNames.PoppinsLight} marginBottom={20} />

        <AppText
          text={"About Me: "}
          size={20}
          family={FontNames.PoppinsBold}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          marginBottom={20}
        />

        <AppImage
          uri={developer_image}
          style={{ width: LOGO_SIZE, height: LOGO_SIZE, marginBottom: 20 }}
        />

        <AppText text={about_owner} size={15} family={FontNames.PoppinsLight} marginBottom={20} />

        <AppText
          text={"Connect With Me: "}
          size={20}
          family={FontNames.PoppinsBold}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          marginBottom={20}
        />

        <View style={styles.socialContainer}>
          <AppIcon
            family={IconNames.AntDesign}
            name="github"
            size={40}
            onPress={() => openUrl(owner_github)}
          />

          <AppIcon
            family={IconNames.MaterialIcons}
            name="email"
            size={40}
            color={ColorPallete.gmailLogoColor}
            onPress={() => onMailPress(owner_email)}
          />

          <AppIcon
            family={IconNames.Ionicons}
            name="logo-stackoverflow"
            size={40}
            color={ColorPallete.orange}
            onPress={() => openUrl(owner_stackoverflow)}
          />

          <AppIcon
            family={IconNames.AntDesign}
            name="linkedin-square"
            size={40}
            color={ColorPallete.primary}
            onPress={() => openUrl(owner_linkedin)}
          />
        </View>
      </ScrollView>
    </AppContainer>
  );
}

// exports
export default AboutScreen;

// styles
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
  },
  socialContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 100,
  },
});
