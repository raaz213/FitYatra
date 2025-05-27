import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = ({ fadeAnim, slideAnim, scaleAnim}: any) => {
  return (
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
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContent: {
    alignItems: "center",
    marginVertical: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#545353",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#787575",
    textAlign: "center",
  },
});
