import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, ScrollView, Animated, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Mission from "../../components/user/about/Mission";
import Story from "../../components/user/about/Story";
import Values from "../../components/user/about/Values";
import Team from "../../components/user/about/Team";
import Footer from "../../components/user/about/Footer";
import Header from "../../components/user/about/Header";

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
        <Header fadeAnim={fadeAnim} slideAnim={slideAnim} scaleAnim={scaleAnim} />

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
  
  content: {
    padding: 20,
  },
});

export default AboutScreen;
