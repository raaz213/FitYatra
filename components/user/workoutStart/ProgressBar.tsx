import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const ProgressBar = ({progressAnim}: any) => {

    const theme = useTheme();
  return (
    <View
      style={[
        styles.progressBar,
        { backgroundColor: theme.colors.surfaceVariant },
      ]}
    >
      <Animated.View
        style={[
          styles.progressFill,
          {
            backgroundColor: "#06407a",
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
    progressBar: {
    height: 4,
    marginHorizontal: 20,
    borderRadius: 2,
    marginTop: 20,
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
});
