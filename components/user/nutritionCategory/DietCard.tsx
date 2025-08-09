import React from "react";
import { ChevronRight } from "lucide-react-native";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Category } from "../../../types/both/nutrition/Category";
import { API_URL } from "../../../constants/apiUrl";

const { width } = Dimensions.get("window");

interface DietCardProps {
  category: Category;
  viewDietPress: (id: string) => void;
}

const DietCard: React.FC<DietCardProps> = ({ category, viewDietPress }) => {
  return (
    <Card style={styles.card} elevation={3}>
      <Pressable
        onPress={() => viewDietPress(category._id)}
        style={styles.pressable}
        android_ripple={{ color: "rgba(255, 255, 255, 0.1)" }}
      >
        <View style={styles.cardContent}>
          <ImageBackground
            source={{ uri: `${API_URL}/uploads/${category.image}` }}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            {/* Gradient overlay for better text readability */}
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)"]}
              locations={[0, 0.5, 1]}
              style={styles.gradientOverlay}
            />

            {/* Content positioned at bottom */}
            <View style={styles.bottomContent}>
              <BlurView intensity={60} tint="dark" style={styles.blurContainer}>
                <View style={styles.contentRow}>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {category.name}
                    </Text>
                    <Text style={styles.cardDescription} numberOfLines={2}>
                      {category.description}
                    </Text>
                  </View>

                  <View style={styles.actionContainer}>
                    <View style={styles.buttonContainer}>
                      <ChevronRight
                        size={20}
                        color="#ffffff"
                        strokeWidth={2.5}
                      />
                    </View>
                  </View>
                </View>
              </BlurView>
            </View>
          </ImageBackground>
        </View>
      </Pressable>
    </Card>
  );
};

export default DietCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
  

    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  pressable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  cardContent: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 10,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden",
  },
  blurContainer: {
    backgroundColor: "rgba(189, 237, 151, 0.25)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  cardDescription: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.85)",
    letterSpacing: -0.1,
    lineHeight: 18,
    fontWeight: "400",
  },
  actionContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#06407a",
    borderWidth: 1,
    borderColor: "#06407a",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
