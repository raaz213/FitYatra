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
import { API_URL } from "../../../constants/apiUrl";
import { Category } from "../../../types/both/exercise/Category";
import { WorkoutContext } from "../../../context/WorkoutContext";
import { BlurView } from "expo-blur";
import { Rows } from "lucide-react-native";

interface CarouselItem {
  category: Category;
  index: number;
}

function FeaturedContent({
  exerciseCategories,
}: {
  exerciseCategories: Category[];
}) {
  const { setCategoryId } = React.useContext<any>(WorkoutContext);

  const handleChallengePress = (categoryId: string) => {
    console.log(`Challenge pressed for: ${categoryId}`);
  };

  const formattedcategories = exerciseCategories.map((category, index) => ({
    category,
    index,
  }));

  return (
    <View style={styles.container}>
      <CustomCarousel
        data={formattedcategories}
        renderItem={({ category }: CarouselItem) => {
          setCategoryId(category._id);
          return (
            <View key={category._id} style={styles.item}>
              <View style={styles.card}>
                {/* Background Image */}
                <Image
                  source={{ uri: `${API_URL}/uploads/${category.image}` }}
                  style={styles.image}
                />

                {/* BlurView over the image */}
                <BlurView
                  intensity={10}
                  tint="dark"
                  style={StyleSheet.absoluteFill}
                />

                {/* Content Overlay */}
                <View style={styles.contentOverlay}>
                  <View style={styles.titleContainer}>
                    <View style={styles.titleBackground}>
                      <Text style={styles.title}>{category.name}</Text>
                    </View>
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.challengeButton}
                      onPress={() => handleChallengePress(category._id)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.buttonGradient}>
                        <Text style={styles.challengeButtonText}>
                          CHALLENGE
                        </Text>
                        <View style={styles.buttonIcon}>
                          <Text style={styles.buttonIconText}>→</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.cardBorder} />
              </View>
            </View>
          );
        }}
        loop={true}
        height={280}
        width={window.width - 32}
        autoPlayInterval={3000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.92,
          parallaxScrollingOffset: 40,
        }}
        paginationDotStyle={{ backgroundColor: "white", borderRadius: 50 }}
        paginationContainerStyle={styles.paginationContainer}
        style={styles.carousel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 28,
  },
  titleContainer: {
    marginBottom: 16,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    width: "100%",
    height: 160,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  title: {
    fontSize: 40,
    fontWeight: "800",

    color: "#FFFFFF",
    letterSpacing: -0.5,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  challengeButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#4F46E5",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    backgroundColor: "#c71b08ff",
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  challengeButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  buttonIcon: {
    marginLeft: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIconText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  cardBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    pointerEvents: "none",
  },
  carousel: {
    marginBottom: 24,
  },
  paginationContainer: {
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 16,
  },
});

export default FeaturedContent;
