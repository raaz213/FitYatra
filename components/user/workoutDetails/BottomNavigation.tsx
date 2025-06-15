import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, useTheme } from "react-native-paper";
import { Exercise } from "../../../types/user/exercise/Exercise";


const BottomNavigation = ({
  navigation,
  exerciseData,
}: {
  navigation: any;
  exerciseData: Exercise;
}) => {
  const theme = useTheme();
  const handleWorkoutStartPress = () => {
    navigation.navigate("WorkoutStart");
  };

  return (
    <View style={[styles.bottomNav, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.progressContainer}>
        <TouchableOpacity style={styles.navButton}>
          <Text
            style={[
              styles.navButtonText,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            ◀
          </Text>
        </TouchableOpacity>
        <Text style={[styles.progressText, { color: theme.colors.onSurface }]}>
          {/* {exerciseData.currentExercise}/{exerciseData.totalExercises} */}
        </Text>
        <TouchableOpacity style={styles.navButton}>
          <Text
            style={[
              styles.navButtonText,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            ▶
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        style={[styles.closeButton, { backgroundColor: "#06407a" }]}
        labelStyle={{ color: theme.colors.background }}
        onPress={handleWorkoutStartPress}
      >
        START
      </Button>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 8,
  },
  progressContainer: { flexDirection: "row", alignItems: "center", gap: 16 },
  navButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: { fontSize: 16, fontWeight: "600" },
  progressText: { fontSize: 16, fontWeight: "600" },
  closeButton: {
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 4,
    elevation: 4,
  },
});
