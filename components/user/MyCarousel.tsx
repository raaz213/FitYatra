import { renderItem } from "../../utils/render-item";
import { window } from "../../constants/sizes";
import * as React from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";

const data = [
  "https://cdn.pixabay.com/photo/2024/07/01/17/11/woman-8865733_640.png",
  "https://cdn.pixabay.com/photo/2021/01/04/06/19/woman-5886559_640.jpg",
  "https://cdn.pixabay.com/photo/2021/01/04/06/20/man-5886571_640.jpg",
  
];

function MyCarousel() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View id="carousel-component">
      <Carousel
        autoPlayInterval={2000}
        data={data}
        height={258}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={window.width}
        style={{
          width: window.width,
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={renderItem({ rounded: true })}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
}

export default MyCarousel;
