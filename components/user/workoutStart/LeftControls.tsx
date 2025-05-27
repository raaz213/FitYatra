import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const LeftControls = ({ toggleSound, isSoundOn}: {toggleSound: () => void, isSoundOn: boolean}) => {
  const theme = useTheme();
  return (
    <View style={styles.leftControls}>
      <TouchableOpacity style={styles.controlButton} onPress={toggleSound}>
        <Text
          style={[styles.controlIcon, { color: theme.colors.onSurfaceVariant }]}
        >
          {isSoundOn ? "🔊" : "🔇"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LeftControls;

const styles = StyleSheet.create({
  leftControls: {
    position: "absolute",
    left: 20,
    top: "50%",
    zIndex: 10,
  },

  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  controlIcon: {
    fontSize: 18,
    fontWeight: "600",
  },
});
