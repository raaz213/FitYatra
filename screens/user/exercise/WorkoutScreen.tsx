import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StatusBar,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

import WeekCalender from "../../../components/user/workout/WeekCalender";
import WorkoutCategory from "../../../components/user/workout/WorkoutCategory";
import ExerciseList from "../../../components/user/workout/ExerciseList";
import WorkoutSummary from "../../../components/user/workout/WorkoutSummary";

import { getExerciseSubcategoriesByCategory } from "../../../services/both/exercise/Subcategory";
import { fetchExercisesBySubcategory } from "../../../services/both/exercise/Exercise";
import { type Subcategory } from "../../../types/both/exercise/Subcategory";
import { type Exercise } from "../../../types/both/exercise/Exercise";
import AppbarHeader from "../../../components/user/workout/AppbarHeader";

export default function WorkoutScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const { categoryId } = route.params;

  const getSubcategoriesByCategory = async () => {
    try {
      const response = await getExerciseSubcategoriesByCategory(categoryId);
      setSubcategories(response);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    if (subcategories.length > 0) {
      setSelectedSubcategory(subcategories[0]._id);
    }
  }, [subcategories]);

  const getExercisesBySubcategory = async () => {
    try {
      if (selectedSubcategory) {
        const response = await fetchExercisesBySubcategory(selectedSubcategory);
        setExercises(response);
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
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

  const currentSubcategory = subcategories.find(
    (subcategory) => subcategory._id === selectedSubcategory
  );

  return (
    <LinearGradient colors={["#d3e1ed", "#d3e1ed"]} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <AppbarHeader navigation={navigation} title={"workout"} />

          <View style={styles.fixedTopContent}>
            <WeekCalender
              setSelectedSubcategory={setSelectedSubcategory}
              selectedSubcategory={selectedSubcategory}
              subcategories={subcategories}
            />
            <WorkoutCategory currentSubcategory={currentSubcategory} />
          </View>

          <ScrollView
            style={styles.exerciseListScrollView}
            contentContainerStyle={styles.exerciseListContentContainer}
          >
            <ExerciseList exercises={exercises} navigation={navigation} />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>

      <WorkoutSummary
        exercises={exercises}
        selectedSubcategory={selectedSubcategory}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  fixedTopContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    gap: 15,
  },
  exerciseListScrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  exerciseListContentContainer: {
    paddingBottom: 10,
  },
});
