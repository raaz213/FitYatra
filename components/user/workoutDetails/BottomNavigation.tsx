import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, useTheme } from "react-native-paper";
import { Exercise } from "../../../types/both/exercise/Exercise";

const BottomNavigation = React.memo(
  ({
    navigation,
    exerciseData,
  }: {
    navigation: any;
    exerciseData: Exercise;
  }) => {
    const theme = useTheme();
    const handleWorkoutStartPress = () => {
      navigation.navigate("WorkoutStart", { exerciseData: exerciseData });
    };

    return (
      <View
        style={[styles.bottomNav, { backgroundColor: theme.colors.surface }]}
      >
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
  }
);

export default BottomNavigation;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
    elevation: 8,
  },

  closeButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
    width: "40%",
    
    paddingVertical: 2,
    elevation: 4,
  },
});
