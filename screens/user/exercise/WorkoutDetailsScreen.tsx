import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppbarHeader from "../../../components/user/workoutDetails/AppbarHeader";
import Illustration from "../../../components/user/workoutDetails/Illustration";
import TabNavigation from "../../../components/user/workoutDetails/TabNavigation";
import InstructionAndFocusArea from "../../../components/user/workoutDetails/InstructionAndFocusArea";
import BottomNavigation from "../../../components/user/workoutDetails/BottomNavigation";
import { LinearGradient } from "expo-linear-gradient";
import { getExerciseById } from "../../../services/user/exercise/Exercise";
import { Exercise } from "../../../types/user/exercise/Exercise";


export default function WorkoutDetailsScreen({ navigation, route }: any) {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState("Animation");
  const [exercise, setExercise] = useState<Exercise | null>(null)

  const { exerciseId } = route.params;

  const getExerciseDetails = async () => {
    const response = await getExerciseById(exerciseId);
    setExercise(response);
  }

  useEffect(() => {
    getExerciseDetails();
  }, [])

  return (
    <LinearGradient colors={["#d3e1ed", "#d3e1ed"]} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {/* Appbar Header */}
          {exercise && (
            <AppbarHeader navigation={navigation} exerciseData={exercise} />
          )}

          <ScrollView style={styles.content}>
            {/* Illustration Section */}
            {exercise && (
              <Illustration
                selectedTab={selectedTab}
                exerciseData={exercise}
              />
            )}

            {/* Tab Navigation */}
            <TabNavigation
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
            />

            {/* Instructions + FocusArea (for both tabs) */}
            {exercise && (
              <InstructionAndFocusArea exerciseData={exercise} />
            )}
          </ScrollView>

          {/* Bottom Navigation */}
        </SafeAreaView>
      </SafeAreaProvider>
      {/* <BottomNavigation navigation={navigation} exerciseData={exercise} /> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 20  },
});
