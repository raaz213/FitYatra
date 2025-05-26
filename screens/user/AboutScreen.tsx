import React, { useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Mission from "../../components/user/about/Mission";
import Story from "../../components/user/about/Story";
import Values from "../../components/user/about/Values";
import Team from "../../components/user/about/Team";
import Footer from "../../components/user/about/Footer";

const { height } = Dimensions.get("window");

const AboutScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
         colors={["#d3e1ed", "#d3e1ed"]}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Mission />
          <Story />
          <Values />
          <Team />
          <Footer />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
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
  content: {
    padding: 20,
  },
});

export default AboutScreen;
