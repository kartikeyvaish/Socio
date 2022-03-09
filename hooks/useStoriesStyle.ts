// Packages imports
import { interpolate, useAnimatedStyle } from "react-native-reanimated";

// Local Imports
import Layout from "../constants/Layout";
import { StoryCardAnimatedProps } from "../store/stories/types";

// Constants
const screenWidth = Layout.window.width;

// Custom hook to get Animated Styles
export default function useStoriesItemStyle(props: StoryCardAnimatedProps) {
    // Destructuring props
    const { scrollX, index } = props;

    const animatedStyles = useAnimatedStyle(() => {
        const scale = interpolate(
            scrollX.value,
            [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
            [0.7, 1, 0.7]
        );

        const translateY = interpolate(
            scrollX.value,
            [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
            [0, 0, 0]
        );

        const rotateY = interpolate(
            scrollX.value,
            [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
            [90, 0, -90]
        );

        const translateX = interpolate(
            scrollX.value,
            [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
            [-(screenWidth / 2), 0, screenWidth / 2]
        );

        return {
            transform: [
                {
                    scale: scale,
                },
                {
                    translateY: translateY,
                },
                {
                    rotateY: `${rotateY}deg`,
                },
                {
                    translateX: translateX,
                },
            ],
        };
    });

    return animatedStyles;
}