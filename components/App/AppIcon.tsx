// Packages imports
import { memo } from "react";
import { ActivityIndicator } from "react-native";

// Local Imports
import IconNames from "../../constants/IconNames";

// Named Imports
import { AppIconProps } from "../../types/ComponentTypes";
import { useAppSelector } from "../../store/reduxHooks";

// Icon component
function AppIcon(props: AppIconProps) {
  // Destructuring props
  const { family, style, onPress, loading, color, margins, ...otherProps } =
    props;

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
        <ActivityIndicator
          color={IconColor}
          size={"small"}
          style={seperateMargins}
        />
      </>
    );

  // return the icon component based on the name
  switch (family) {
    case IconNames.AntDesign: {
      // Lazy Loading
      const AntDesign = require("@expo/vector-icons/AntDesign").default;
      return <AntDesign {...finalProps} />;
    }
    case IconNames.Entypo: {
      // Lazy Loading
      const Entypo = require("@expo/vector-icons/Entypo").default;
      return <Entypo {...finalProps} />;
    }
    case IconNames.EvilIcons: {
      // Lazy Loading
      const EvilIcons = require("@expo/vector-icons/EvilIcons").default;
      return <EvilIcons {...finalProps} />;
    }
    case IconNames.Feather: {
      const Feather = require("@expo/vector-icons/Feather").default;
      return <Feather {...finalProps} />;
    }
    case IconNames.FontAwesome: {
      const FontAwesome = require("@expo/vector-icons/FontAwesome").default;
      return <FontAwesome {...finalProps} />;
    }
    case IconNames.FontAwesome5: {
      const FontAwesome5 = require("@expo/vector-icons/FontAwesome5").default;
      return <FontAwesome5 {...finalProps} />;
    }
    case IconNames.Ionicons: {
      const Ionicons = require("@expo/vector-icons/Ionicons").default;
      return <Ionicons {...finalProps} />;
    }
    case IconNames.MaterialCommunityIcons: {
      const MaterialCommunityIcons =
        require("@expo/vector-icons/MaterialCommunityIcons").default;
      return <MaterialCommunityIcons {...finalProps} />;
    }
    case IconNames.MaterialIcons: {
      const MaterialIcons = require("@expo/vector-icons/MaterialIcons").default;
      return <MaterialIcons {...finalProps} />;
    }
    case IconNames.Octicons: {
      const Octicons = require("@expo/vector-icons/Octicons").default;
      return <Octicons {...finalProps} />;
    }
    case IconNames.SimpleLineIcons: {
      const SimpleLineIcons =
        require("@expo/vector-icons/SimpleLineIcons").default;
      return <SimpleLineIcons {...finalProps} />;
    }
    case IconNames.Fontisto: {
      const Fontisto = require("@expo/vector-icons/Fontisto").default;
      return <Fontisto {...finalProps} />;
    }
    case IconNames.Foundation: {
      const Foundation = require("@expo/vector-icons/Foundation").default;
      return <Foundation {...finalProps} />;
    }
    default:
      return null;
  }
}

// Exports
export default memo(AppIcon);
