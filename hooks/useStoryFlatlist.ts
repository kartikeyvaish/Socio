// Packages imports 
import { useRef, useState } from "react";
import { FlatList } from "react-native";

// Custom hook to track of viewable items in flatlist
export default function useStoryFlatlist({ length = 0, goBack }: { length: number, goBack?: () => void }) {
    // Local Refs and States
    const FlatListRef = useRef<FlatList>(null);
    const [ViewableItem, SetViewableItem] = useState<string>(null);
    const ViewableIndex = useRef(0);
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });

    // Viewable configuration
    const onViewRef = useRef((viewableItems: any) => {
        if (viewableItems?.viewableItems?.length > 0) {
            SetViewableItem(viewableItems.viewableItems[0].item._id || "");
            ViewableIndex.current = viewableItems.viewableItems[0].index;
        }
    });

    // function to scroll to the previous item
    const ScrollToPrevious = async () => {
        try {
            if (FlatListRef.current) {
                FlatListRef.current.scrollToIndex({
                    index: ViewableIndex.current > 0 ? ViewableIndex.current - 1 : 0,
                    animated: true,
                });
            }
        } catch (error) { }
    };

    // function to scroll to the next item
    const ScrollToNext = async () => {
        try {
            if (FlatListRef.current) {
                if (ViewableIndex.current < length - 1) {
                    FlatListRef.current.scrollToIndex({
                        index: ViewableIndex.current + 1,
                        animated: true,
                    });
                } else {
                    if (typeof goBack === "function") goBack();
                }
            }
        } catch (error) { }
    };

    // return necessary values
    return {
        FlatListRef,
        ViewableItem,
        SetViewableItem,
        viewConfigRef: viewConfigRef.current,
        onViewRef,
        ScrollToPrevious,
        ScrollToNext,
    };
}