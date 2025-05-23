import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Mission = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.sectionText}>
        We believe that everyone deserves access to personalized fitness
        tracking that motivates and empowers. Our mission is to make health and
        wellness achievable for people of all fitness levels through innovative
        technology and thoughtful design.
      </Text>
    </View>
  );
};

export default Mission;

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "black",
  },
});
