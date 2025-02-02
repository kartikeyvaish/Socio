// Packages imports
import { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

// Custom hook to track of viewable items in flatlist
export default function useFlatList(initialViewableItem: number = null) {
  // Local Refs and States
  const flatListRef = useRef<FlatList>(null);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });

  const [viewableItem, setViewableItem] = useState<number>(initialViewableItem);

  // Viewable configuration
  const onViewRef = useRef((info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
    if (info.viewableItems?.[0]?.index !== undefined)
      setViewableItem(info.viewableItems[0].item.id);
  });

  // return necessary values
  return {
    flatListRef,
    viewableItem,
    setViewableItem,
    viewConfigRef: viewConfigRef.current,
    onViewRef
  };
}
