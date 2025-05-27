import { Animated, StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

const Header = ({ fadeAnim, slideAnim, scaleAnim }: any) => {
  return (
    <ImageBackground
      source={{uri: 'https://static.vecteezy.com/system/resources/previews/041/388/946/non_2x/ai-generated-gym-weights-on-textured-background-fitness-concept-photo.jpg'}} // use your image path here
      style={styles.background}
      resizeMode="cover"
    >
      <Animated.View
        style={[
          styles.headerContent,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.headerTitle}>FitTracker Pro</Text>
        <Text style={styles.headerSubtitle}>
          Your Personal Wellness Companion
        </Text>
      </Animated.View>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    textAlign: "center",
  },
});
