import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppbarHeader from "../../../components/user/workoutDetails/AppbarHeader";
import Illustration from "../../../components/user/workoutDetails/Illustration";
import TabNavigation from "../../../components/user/workoutDetails/TabNavigation";
import InstructionAndFocusArea from "../../../components/user/workoutDetails/InstructionAndFocusArea";
import BottomNavigation from "../../../components/user/workoutDetails/BottomNavigation";
import { LinearGradient } from "expo-linear-gradient";

interface Exercise {
  id: string;
  name: string;
  gif: string;
  youtubeUrl: string;
  instructions: string[];
  focusArea: string[];
  totalExercises: number;
  currentExercise: number;
}

const exerciseData: Exercise = {
  id: "1",
  name: "ABDOMINAL CRUNCHES",
  gif: "https://gymvisual.com/img/p/1/6/8/8/2/16882.gif",
  youtubeUrl: "https://www.youtube.com/shorts/VZUDAOL2LI8",
  instructions: [
    "Lie on your back with your knees bent and your arms stretched forward.",
    "Then lift your upper body off the floor. Hold for a few seconds and slowly return.",
    "It primarily works the rectus abdominis muscle and the obliques.",
  ],
  focusArea: ["Abs"],
  totalExercises: 15,
  currentExercise: 1,
};

export default function WorkoutDetailsScreen({ navigation }: any) {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState("Animation");

  return (
    <LinearGradient colors={["#d3e1ed", "#d3e1ed"]} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {/* Appbar Header */}
          <AppbarHeader navigation={navigation} exerciseData={exerciseData} />

          <ScrollView style={styles.content}>
            {/* Illustration Section */}
            <Illustration
              selectedTab={selectedTab}
              exerciseData={exerciseData}
            />

            {/* Tab Navigation */}
            <TabNavigation
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
            />

            {/* Instructions + FocusArea (for both tabs) */}
            <InstructionAndFocusArea exerciseData={exerciseData} />
          </ScrollView>

          {/* Bottom Navigation */}
        </SafeAreaView>
      </SafeAreaProvider>
      <BottomNavigation navigation={navigation} exerciseData={exerciseData} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 20  },
});
