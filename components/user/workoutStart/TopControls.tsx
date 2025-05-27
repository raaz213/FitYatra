import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const TopControls = ({
  navigation,
  handleRestart,
}: {
  navigation: any;
  handleRestart: () => void;
}) => {
  const theme = useTheme();
  const handleClose = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.topControls}>
      <TouchableOpacity style={styles.controlButton} onPress={handleClose}>
        <Text
          style={[styles.controlIcon, { color: theme.colors.onSurfaceVariant }]}
        >
          ✕
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={handleRestart}>
        <Text
          style={[styles.controlIcon, { color: theme.colors.onSurfaceVariant }]}
        >
          ↻
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopControls;

const styles = StyleSheet.create({
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
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
