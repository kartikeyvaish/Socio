// Packages Imports
import { View, StyleSheet } from "react-native";

// Local Imports
import ColorPallete from "../constants/ColorPallete";

// function component for StoriesBars
function StoriesBars(props: any) {
  // Destructuring props
  const { current_viewing_item, stories = [] } = props;

  // render
  return (
    <View style={styles.container}>
      {stories.map((item, index) => {
        return (
          <View key={item._id} style={styles.eachBarContainer}>
            <View
              style={[
                {
                  height: "100%",
                  backgroundColor: ColorPallete.white,
                  width: current_viewing_item.index > index ? "100%" : "0%",
                },
              ]}
            ></View>
          </View>
        );
      })}
    </View>
  );
}

// exports
export default StoriesBars;

// styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.1)",
    flexDirection: "row",
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  eachBarContainer: {
    flex: 1,
    backgroundColor: ColorPallete.grey,
    height: 5,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 100,
    overflow: "hidden",
  },
});
