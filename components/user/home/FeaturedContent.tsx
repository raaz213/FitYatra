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
import { Subcategory } from "../../../types/user/exercise/Subcategory";
import { API_URL } from "../../../constants/apiUrl";


interface CarouselItem {
  subcategory: Subcategory;
  index: number;
};


function FeaturedContent({ exerciseSubcategories}: {exerciseSubcategories: Subcategory[]}) {
  
  const handleChallengePress = (subcategoryId: string) => {
    console.log(`Challenge pressed for: ${subcategoryId}`);
  };

  const formattedSubcategories = exerciseSubcategories.map((subcategory, index) => ({
    subcategory,
    index
  }))

  return (
    <View>
      <CustomCarousel
        data={formattedSubcategories}
        renderItem={({ subcategory }: CarouselItem) => {
         
          return (
            <View key={subcategory._id} style={styles.item}>
              <View style={styles.imageContainer}>
                <Image source={{ uri:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREWR0nU22XW4OZUHtGcq5kx2hwTLg5pth8Nw&s" }} style={styles.image} />
                <View style={styles.overlay} />
                <View style={styles.contentOverlay}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.title}>{subcategory.name}</Text>
                  </View>
                  <Text style={styles.subtitle}>{subcategory.description}</Text>

                  <TouchableOpacity
                    style={styles.challengeButton}
                    onPress={() => handleChallengePress(subcategory._id)}
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
        width={window.width-20}
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
    marginTop: 25
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
