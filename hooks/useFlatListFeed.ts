// Packages imports

import { useScrollToTop } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { FlatList } from "react-native";

// Local imports

// Custom hook to track of viewable items in flatlist
export default function useFlatListFeed() {
    // Local Refs and States
    const FlatlistRef = useRef<FlatList>(null);
    const lastViewItem = useRef<string>(null);
    const [ViewableItem, SetViewableItem] = useState<string>(null);
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });
    const last_post_id = useRef<string>(null);

    // Viewable configuration
    const onViewRef = useRef((viewableItems: any) => {
        if (viewableItems?.viewableItems?.length > 0) {
            SetViewableItem(viewableItems.viewableItems[0].item._id || 0);
            lastViewItem.current = viewableItems.viewableItems[0].item._id || 0;
        }
    });

    // On double tap of Home Screen tab, the user scrolls to top
    useScrollToTop(FlatlistRef);

    // useCallback for Resume Playing
    const ResumePlay = useCallback(() => {
        try {
            if (lastViewItem.current !== null) {
                SetViewableItem(lastViewItem.current);
            }
        } catch (error) { }
    }, [ViewableItem, lastViewItem.current]);

    // return necessary values
    return {
        FlatlistRef,
        ViewableItem,
        SetViewableItem,
        viewConfigRef: viewConfigRef.current,
        onViewRef,
        lastViewItem: lastViewItem.current,
        ResumePlay,
        last_post_id: last_post_id
    };
}