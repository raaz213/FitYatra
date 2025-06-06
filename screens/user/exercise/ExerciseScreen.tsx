import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CategoryCard from "../../../components/user/exercise/CategoryCard";
import StartTrainingButton from "../../../components/user/exercise/StartTrainingButton";
import { Category } from "../../../types/user/exercise/Category";
import { fetchAllCategories } from "../../../services/user/exercise/Category";



const ExerciseScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const response = await fetchAllCategories();
    setCategories(response);
  }

  useEffect(() => {
   fetchCategories() 
  }, []);

  const animateValue = useRef(new Animated.Value(0)).current;

  return (
    <LinearGradient colors={["#d3e1ed", "#d3e1ed"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {categories.map((category: Category) => (
            <CategoryCard
              key={category._id}
              category={category}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              animatedValue={animateValue}
            />
          ))}
        </ScrollView>

        {selectedCategory && (
          <StartTrainingButton
            selectedCategory={selectedCategory}
            animateValue={animateValue}
            navigation={navigation}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
});

export default ExerciseScreen;
