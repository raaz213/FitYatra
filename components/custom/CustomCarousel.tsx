import * as React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";

interface CustomCarouselProps<T extends {}> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement | null;
  height?: number;
  width?: number;
  autoPlayInterval?: number;
  loop?: boolean;
  mode?: "horizontal-stack" | "vertical-stack";
  modeConfig?: object;
  paginationDotStyle?: StyleProp<ViewStyle>;
  paginationContainerStyle?: StyleProp<ViewStyle>;
  onPageChange?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
}

function CustomCarousel<T extends {}>({
  data,
  renderItem,
  height = 258,
  width = 320,
  autoPlayInterval = 3000,
  loop = true,
  mode = "horizontal-stack",
  modeConfig = {},
  paginationDotStyle,
  paginationContainerStyle,
  onPageChange,
  style,
}: CustomCarouselProps<T>) {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const handleProgressChange = React.useCallback(
    (value: number) => {
      progress.value = value;
    },
    [progress]
  );

  const handleSnapToItem = React.useCallback(
    (index: number) => {
      onPageChange?.(index);
    },
    [onPageChange]
  );

  const onPressPagination = (index: number) => {
    const currentIndex = Math.round(progress.value);
    ref.current?.scrollTo({
      count: index - currentIndex,
      animated: true,
    });
  };

  return (
    <View style={style}>
      <Carousel
        ref={ref}
        autoPlayInterval={autoPlayInterval}
        data={data}
        height={height}
        width={width}
        loop={loop}
        pagingEnabled
        snapEnabled
        mode={mode}
        modeConfig={modeConfig}
        onProgressChange={handleProgressChange}
        onSnapToItem={handleSnapToItem}
        renderItem={({ item, index }) => {
          const element = renderItem(item, index);
          return React.isValidElement(element) ? element : <View />;
        }}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={paginationDotStyle ? (paginationDotStyle as any) : undefined}
        containerStyle={paginationContainerStyle}
        onPress={onPressPagination}
      />
    </View>
  );
}

export default CustomCarousel;