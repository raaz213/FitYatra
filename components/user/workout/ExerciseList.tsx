import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card, useTheme } from "react-native-paper";
import { Exercise } from "../../../types/user/exercise/Exercise";
import { API_URL } from "../../../constants/apiUrl";



const ExerciseList = ({ navigation, exercises}: {navigation: any, exercises: Exercise[]}) => {
  const theme = useTheme();
  const handleWorkoutPress = (exerciseId: string) => {
    navigation.navigate("WorkoutDetails", { exerciseId });
  };
  return (
    <View style={styles.exerciseList}>
      {exercises.map((exercise, index) => (
        <Card
          key={exercise._id}
          style={[
            styles.exerciseCard,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <TouchableOpacity
            onPress={() => handleWorkoutPress(exercise._id)}
            activeOpacity={0.7}
            style={{ flex: 1 }}
          >
            <Card.Content style={styles.exerciseContent}>
              <View
                style={[styles.exerciseNumber, { backgroundColor: "#06407a" }]}
              >
                <Text
                  style={[
                    styles.numberText,
                    { color: theme.colors.background },
                  ]}
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>
              </View>

              <View style={styles.exerciseInfo}>
                <Text
                  style={[
                    styles.exerciseName,
                    { color: theme.colors.onSurface },
                  ]}
                >
                  {exercise.name}
                </Text>
                <Text
                  style={[
                    styles.exerciseSets,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {exercise.sets}
                </Text>
              </View>

              <Image
                source={{ uri: `${API_URL}/uploads/${exercise.image}` }}
                style={[
                  styles.exerciseImage,
                  { borderColor: theme.colors.outline },
                ]}
                resizeMode="cover"
              />
            </Card.Content>
          </TouchableOpacity>
        </Card>
      ))}
    </View>
  );
};

export default ExerciseList;

const styles = StyleSheet.create({
  exerciseList: {
    gap: 16,
    paddingBottom: 24,
  },
  exerciseCard: {
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  exerciseContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  exerciseNumber: {
    width: 40,
    height: 40,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    elevation: 2,
  },
  numberText: {
    fontSize: 14,
    fontWeight: "800",
  },
  exerciseInfo: {
    flex: 1,
    marginRight: 16,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  exerciseSets: {
    fontSize: 10,
    fontWeight: "500",
    opacity: 0.8,
    letterSpacing: 0.2,
  },
  exerciseImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#2D2D2D",
    borderWidth: 1,
  },
});
