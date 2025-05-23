
import { window } from "../../../constants/sizes";
import * as React from "react";
import { Image, View } from "react-native";
import CustomCarousel from "../../custom/CustomCarousel";
import { StyleSheet } from "react-native";

const images = [
  "https://cdn.pixabay.com/photo/2024/07/01/17/11/woman-8865733_640.png",
  "https://cdn.pixabay.com/photo/2021/01/04/06/19/woman-5886559_640.jpg",
  "https://cdn.pixabay.com/photo/2021/01/04/06/20/man-5886571_640.jpg",
];

const formattedImages = images.map((item, index) => ({
  item,
  index,
}));

function FeaturedContent() {
  return (
    <View id="carousel-component">
      <CustomCarousel
        data={formattedImages}
        renderItem={({ item, index }: { item: string; index: number }) => (
          <View key={index} style={[styles.item]}>
            <Image
              source={{ uri: item }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 10,
              }}
            />
          </View>
        )}
        loop={true}
        height={258}
        width={window.width}
        autoPlayInterval={2000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        paginationDotStyle={{ backgroundColor: "white", borderRadius: 50 }}
        paginationContainerStyle={{ gap: 5, marginTop: 10 }}
        style={{ marginBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default FeaturedContent;
