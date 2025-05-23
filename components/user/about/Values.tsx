import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Values = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Our Values</Text>
      <View style={styles.valuesList}>
        <View style={styles.valueItem}>
          <View style={styles.valueIcon}>
            <Text style={styles.valueEmoji}>🎯</Text>
          </View>
          <View style={styles.valueContent}>
            <Text style={styles.valueTitle}>Precision</Text>
            <Text style={styles.valueDescription}>
              Accurate tracking for meaningful insights
            </Text>
          </View>
        </View>

        <View style={styles.valueItem}>
          <View style={styles.valueIcon}>
            <Text style={styles.valueEmoji}>💪</Text>
          </View>
          <View style={styles.valueContent}>
            <Text style={styles.valueTitle}>Empowerment</Text>
            <Text style={styles.valueDescription}>
              Tools that inspire and motivate progress
            </Text>
          </View>
        </View>

        <View style={styles.valueItem}>
          <View style={styles.valueIcon}>
            <Text style={styles.valueEmoji}>🌟</Text>
          </View>
          <View style={styles.valueContent}>
            <Text style={styles.valueTitle}>Excellence</Text>
            <Text style={styles.valueDescription}>
              Continuous improvement in everything we do
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Values;

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
    color: "#475569",
  },
  valuesList: {
    marginTop: 8,
  },
  valueItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#c7c7c7",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  valueIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  valueEmoji: {
    fontSize: 24,
  },
  valueContent: {
    flex: 1,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  valueDescription: {
    fontSize: 14,
    color: "#64748b",
  },
});
