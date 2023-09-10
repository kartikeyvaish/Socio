// Packages imports
import { memo } from "react";
import { ActivityIndicator } from "react-native";

// Icons Imports
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

// Configs/Constants and Types
import { AppIconProps } from "../../types/ComponentTypes";
import IconNames from "../../constants/IconNames";
import { useAppSelector } from "../../store/reduxHooks";

// Icon component
function AppIcon(props: AppIconProps) {
  // Destructuring props
  const { family, style, onPress, loading, color, margins, ...otherProps } = props;

  // Holds the Redux State
  const theme = useAppSelector(state => state.theme);

  // Get Icon Color
  const IconColor = color ? color : theme.colors.text;

  // seperate margins
  const seperateMargins = {
    margin: margins?.all,
    marginTop: margins?.top,
    marginRight: margins?.right,
    marginBottom: margins?.bottom,
    marginLeft: margins?.left,
  };

  // Icon Component Props
  const finalProps = {
    // name: name,
    color: IconColor,
    onPress: onPress,
    style: [seperateMargins, style],
    ...otherProps,
  };

  if (loading)
    return (
      <>
        <ActivityIndicator color={IconColor} size={"small"} style={seperateMargins} />
      </>
    );

  // return the icon component based on the name
  switch (family) {
    case IconNames.AntDesign:
      return <AntDesign {...finalProps} />;
    case IconNames.Entypo:
      return <Entypo {...finalProps} />;
    case IconNames.EvilIcons:
      return <EvilIcons {...finalProps} />;
    case IconNames.Feather:
      return <Feather {...finalProps} />;
    case IconNames.FontAwesome:
      return <FontAwesome {...finalProps} />;
    case IconNames.FontAwesome5:
      return <FontAwesome5 {...finalProps} />;
    case IconNames.Ionicons:
      return <Ionicons {...finalProps} />;
    case IconNames.MaterialCommunityIcons:
      return <MaterialCommunityIcons {...finalProps} />;
    case IconNames.MaterialIcons:
      return <MaterialIcons {...finalProps} />;
    case IconNames.Octicons:
      return <Octicons {...finalProps} />;
    case IconNames.SimpleLineIcons:
      return <SimpleLineIcons {...finalProps} />;
    case IconNames.Fontisto:
      return <Fontisto {...finalProps} />;
    case IconNames.Foundation:
      return <Foundation {...finalProps} />;
    default:
      return null;
  }
}

// Exports
export default memo(AppIcon);
