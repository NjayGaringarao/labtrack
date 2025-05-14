import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  LayoutChangeEvent,
  ViewToken,
} from "react-native";

interface IFaceCameraTip {
  title: string;
  tips: string[];
  shiftInterval?: number;
}

const FaceCameraTip = ({
  title,
  tips,
  shiftInterval = 5000,
}: IFaceCameraTip) => {
  const flatListRef = useRef<FlatList<string>>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  useEffect(() => {
    if (tips.length === 0 || containerWidth === 0) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % tips.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, shiftInterval);

    return () => clearInterval(interval);
  }, [currentIndex, tips.length, containerWidth]);

  return (
    <View onLayout={onLayout}>
      <Text className="text-lg">{title}</Text>

      {containerWidth > 0 && (
        <FlatList
          ref={flatListRef}
          data={tips}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, index) => ({
            length: containerWidth,
            offset: containerWidth * index,
            index,
          })}
          renderItem={({ item }) => (
            <View
              style={{ width: containerWidth }}
              className="items-center justify-start px-4"
            >
              <Text className="text-base text-uBlack text-start">{item}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default FaceCameraTip;
