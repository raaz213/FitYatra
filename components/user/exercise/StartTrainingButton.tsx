import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface StartTrainingButtonProps {
  selectedCategory: number;
  animateValue: Animated.Value;
  navigation: any;
}

const StartTrainingButton: React.FC<StartTrainingButtonProps> = ({
  selectedCategory,
  animateValue,
  navigation,
}) => {
  const handleWorkoutPress = (categoryId: number) => {
    navigation.navigate("Workout", {
      categoryId: selectedCategory,
    });
  };
  return (
    <Animated.View
      style={[
        styles.bottomContainer,
        {
          transform: [
            {
              translateY: animateValue.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={["#06407a", "#06407a"]}
        style={styles.continueButton}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => handleWorkoutPress(1)}
        >
          <Text style={styles.continueText}>Start Training Now</Text>
          <Ionicons
            name="arrow-forward-circle"
            size={28}
            color="#FFFFFF"
            style={styles.continueIcon}
          />
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};

export default StartTrainingButton;

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 32,
    shadowColor: "#8A4FFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
  continueText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  continueIcon: {
    marginLeft: 4,
  },
});
