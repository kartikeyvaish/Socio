// Packages Imports
import { View, StyleSheet } from "react-native";
import Animated, { FadeInLeft, FadeOutLeft, Layout } from "react-native-reanimated";

// Local Imports
import AppImage from "./AppImage";
import AppText from "./AppText";
import FontNames from "../constants/FontNames";
import { PeopleCardProps } from "../types/ComponentTypes";
import TextButton from "./TextButton";

// function component for PeopleCard
function PeopleCard(props: PeopleCardProps) {
  // Destructuring props
  const {
    profile_picture,
    title,
    subtitle,
    firstButtonTitle,
    secondButtonTitle,
    firstButtonOnPress,
    secondButtonOnPress,
    firstButtonProps,
    secondButtonProps,
    onSubtitlePress,
    onTitlePress,
    buttonContainerStyle,
    imageProps,
  } = props;

  // render
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInLeft}
      exiting={FadeOutLeft}
      layout={Layout}
    >
      {profile_picture ? (
        <AppImage
          uri={profile_picture}
          style={{ width: 30, height: 30 }}
          borderRadius={40}
          {...imageProps}
        />
      ) : null}

      <View style={{ flex: 1 }}>
        <View style={{ marginLeft: profile_picture ? 20 : 0 }}>
          <AppText text={title} family={FontNames.InterBold} size={15} onPress={onTitlePress} />
          <AppText
            text={subtitle}
            family={FontNames.PoppinsLight}
            size={13}
            onPress={onSubtitlePress}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <View style={[styles.btnsContainer, buttonContainerStyle]}>
          {firstButtonTitle ? (
            <TextButton
              text={firstButtonTitle}
              onPress={firstButtonOnPress}
              {...firstButtonProps}
            />
          ) : null}

          {secondButtonTitle ? (
            <TextButton
              text={secondButtonTitle}
              onPress={secondButtonOnPress}
              {...secondButtonProps}
            />
          ) : null}
        </View>
      </View>
    </Animated.View>
  );
}

// exports
export default PeopleCard;

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  btnsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginLeft: 25,
  },
});
