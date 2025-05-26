import { window } from "../../../constants/sizes";
import * as React from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import CustomCarousel from "../../custom/CustomCarousel";

type ImageData = {
  uri: string;
  title: string;
  subtitle: string;
};

type CarouselItem = {
  item: ImageData;
  index: number;
};

const images: ImageData[] = [
  {
    uri: "https://youfit.com/wp-content/uploads/2024/06/YouFit-06-20-22-2527-Edit.jpg",
    title: "Lose Belly Fat",
    subtitle: "Burn calories effectively",
  },
  {
    uri: "https://as2.ftcdn.net/v2/jpg/00/99/82/15/1000_F_99821575_nVEHTBXzUnTcLIKN6yOymAWAnFwEybGb.jpg",
    title: "Rock Hard Abs",
    subtitle: "Core strengthening workouts",
  },
  {
    uri: "https://www.fastandup.in/nutrition-world/wp-content/uploads/2023/05/Workouts-for-Men.jpg",
    title: "Six Pack Abs",
    subtitle: "Advanced ab sculpting",
  },
];

const formattedImages = images.map((item, index) => ({
  item,
  index,
}));

function FeaturedContent() {
  const handleChallengePress = (title: string) => {
    console.log(`Challenge pressed for: ${title}`);
  };

  return (
    <View>
      <CustomCarousel
        data={formattedImages}
        renderItem={({ item }: CarouselItem) => {
          const imageData = item;

          return (
            <View key={imageData.uri} style={styles.item}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: imageData.uri }} style={styles.image} />
                <View style={styles.overlay} />
                <View style={styles.contentOverlay}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.title}>{imageData.title}</Text>
                  </View>
                  <Text style={styles.subtitle}>{imageData.subtitle}</Text>

                  <TouchableOpacity
                    style={styles.challengeButton}
                    onPress={() => handleChallengePress(imageData.title)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.challengeButtonText}>CHALLENGE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
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

type Style = {
  item: ViewStyle;
  imageContainer: ViewStyle;
  image: ImageStyle;
  overlay: ViewStyle;
  contentOverlay: ViewStyle;
  titleContainer: ViewStyle;
  starIcon: TextStyle;
  title: TextStyle;
  subtitle: TextStyle;
  challengeButton: ViewStyle;
  challengeButtonText: TextStyle;
};

const styles = StyleSheet.create<Style>({
  item: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  contentOverlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "flex-start",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  starIcon: {
    fontSize: 20,
    marginRight: 8,
    color: "#FF0000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    marginBottom: 15,
    opacity: 0.9,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  challengeButton: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  challengeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default FeaturedContent;
