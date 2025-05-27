import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const RightControls = ({
  handlePause,
  isPaused,
}: {
  handlePause: () => void;
  isPaused: boolean;
}) => {
  const theme = useTheme();
  return (
    <View style={styles.rightControls}>
      <TouchableOpacity style={styles.controlButton} onPress={handlePause}>
        <Text
          style={[styles.controlIcon, { color: theme.colors.onSurfaceVariant }]}
        >
          {isPaused ? "▶" : "⏸"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RightControls;

const styles = StyleSheet.create({
  rightControls: {
    position: "absolute",
    right: 20,
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
