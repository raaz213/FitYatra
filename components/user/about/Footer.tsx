import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>FitTracker Pro © 2024</Text>
      <Text style={styles.footerSubText}>
        Made with ❤️ for your wellness journey
      </Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    marginTop: 32,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: "#06407a",
  },
  footerText: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 4,
  },
  footerSubText: {
    fontSize: 12,
    color: "#94a3b8",
  },
});
