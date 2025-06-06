import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WeekCalender from "../../../components/user/workout/WeekCalender";
import AppbarHeader from "../../../components/user/workout/AppbarHeader";
import WorkoutCategory from "../../../components/user/workout/WorkoutCategory";
import ExerciseList from "../../../components/user/workout/ExerciseList";
import WorkoutSummary from "../../../components/user/workout/WorkoutSummary";
import { LinearGradient } from "expo-linear-gradient";
import { getExerciseSubcategoriesByCategory } from "../../../services/user/exercise/Subcategory";
import { Subcategory } from "../../../types/user/exercise/Subcategory";
import { Exercise } from "../../../types/user/exercise/Exercise";
import { fetchExercisesBySubcategory } from "../../../services/user/exercise/Exercise";

export default function WorkoutScreen({
  navigation,
  route,
}: {
  navigation: any
  route: any;
}) {
  const theme = useTheme();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const { categoryId } = route.params;

  const getSubcategoriesByCategory = async () => {
    const response = await getExerciseSubcategoriesByCategory(categoryId);
    setSubcategories(response);
  };

  useEffect(() => {
    if (subcategories.length > 0) {
      setSelectedSubcategory(subcategories[0]._id);
    }
  }, [subcategories]);

  const getExercisesBySubcategory = async () => {
    const response = await fetchExercisesBySubcategory(selectedSubcategory);
    setExercises(response);
  };

  useEffect(() => {
    if (categoryId) {
      getSubcategoriesByCategory();
    }
  }, [categoryId]);

  useEffect(() => {
    if (selectedSubcategory) {
      getExercisesBySubcategory();
    }
  }, [selectedSubcategory]);

  const currentSubcategory = subcategories.find((subcategory) => subcategory._id === selectedSubcategory);

  return (
    <LinearGradient colors={["#d3e1ed", "#d3e1ed"]} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {/* <AppbarHeader
            currentWorkout={currentWorkout}
            navigation={navigation}
          /> */}

          <ScrollView style={styles.content}>
            {/* Week Calendar */}
            <WeekCalender
              setSelectedSubcategory={setSelectedSubcategory}
              selectedSubcategory={selectedSubcategory}
              subcategories={subcategories}

            />

            {/* Workout Category */}
            <WorkoutCategory currentSubcategory={currentSubcategory} />

            {/* Exercise List */}
            <ExerciseList
              exercises={exercises}
              navigation={navigation}
            />

            {/* Workout Summary */}
            <WorkoutSummary
              exercises={exercises}
              selectedSubcategory={selectedSubcategory}
            />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
