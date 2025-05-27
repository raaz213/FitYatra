import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Card,
  Button,
  Provider as PaperProvider,
  DefaultTheme,
  Chip,
  Divider,
} from "react-native-paper";
import {
  ChevronRight,
  Wifi,
  Battery,
  Signal,
  ArrowLeft,
  Clock,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  Utensils,
  Apple,
} from "lucide-react-native";
import { window } from "../../../constants/sizes";

const { width } = Dimensions.get("window");

// Custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4CAF50",
    accent: "#FF9800",
    background: "#F8F9FA",
    surface: "#FFFFFF",
    text: "#2E2E2E",
  },
};

interface DietOption {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  goal: "muscle_gain" | "weight_loss" | "balanced" | "general";
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface MealPlan {
  id: string;
  name: string;
  time: string;
  calories: number;
  image: string;
  ingredients: string[];
}

const dietOptions: DietOption[] = [
  {
    id: "1",
    title: "Balanced",
    description: "The scientific choice for nutrition",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
    color: "#E8F5E8",
    goal: "balanced",
    calories: "2000-2200",
    protein: "25%",
    carbs: "45%",
    fats: "30%",
    duration: "4-6 weeks",
    difficulty: "Easy",
  },
  {
    id: "2",
    title: "Low carb",
    description: "Low in carbs, high in flavor",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
    color: "#FFF3E0",
    goal: "weight_loss",
    calories: "1500-1800",
    protein: "35%",
    carbs: "20%",
    fats: "45%",
    duration: "6-8 weeks",
    difficulty: "Medium",
  },
  {
    id: "3",
    title: "Keto",
    description: "High fat, minimal carbs",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&h=200&fit=crop",
    color: "#E3F2FD",
    goal: "weight_loss",
    calories: "1600-1900",
    protein: "25%",
    carbs: "5%",
    fats: "70%",
    duration: "8-12 weeks",
    difficulty: "Hard",
  },
  {
    id: "4",
    title: "Vegetarian",
    description: "Plant-based choices",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop",
    color: "#F3E5F5",
    goal: "balanced",
    calories: "1800-2100",
    protein: "20%",
    carbs: "50%",
    fats: "30%",
    duration: "4-6 weeks",
    difficulty: "Easy",
  },
  {
    id: "5",
    title: "High Protein",
    description: "Optimized for muscle building",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop",
    color: "#FFE8E8",
    goal: "muscle_gain",
    calories: "2500-2800",
    protein: "40%",
    carbs: "35%",
    fats: "25%",
    duration: "8-12 weeks",
    difficulty: "Medium",
  },
  {
    id: "6",
    title: "Bulking",
    description: "Maximum muscle gain protocol",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
    color: "#E8F8FF",
    goal: "muscle_gain",
    calories: "3000-3500",
    protein: "35%",
    carbs: "45%",
    fats: "20%",
    duration: "12-16 weeks",
    difficulty: "Hard",
  },
];

const sampleMealPlans: { [key: string]: MealPlan[] } = {
  "2": [
    // Low carb
    {
      id: "1",
      name: "Avocado & Egg Breakfast",
      time: "8:00 AM",
      calories: 420,
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200&h=150&fit=crop",
      ingredients: ["2 eggs", "1/2 avocado", "spinach", "olive oil"],
    },
    {
      id: "2",
      name: "Grilled Chicken Salad",
      time: "1:00 PM",
      calories: 380,
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=150&fit=crop",
      ingredients: [
        "chicken breast",
        "mixed greens",
        "cucumber",
        "olive oil dressing",
      ],
    },
    {
      id: "3",
      name: "Salmon with Vegetables",
      time: "7:00 PM",
      calories: 450,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=150&fit=crop",
      ingredients: ["salmon fillet", "broccoli", "asparagus", "lemon"],
    },
  ],
  "5": [
    // High Protein
    {
      id: "1",
      name: "Protein Pancakes",
      time: "7:00 AM",
      calories: 520,
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150&fit=crop",
      ingredients: ["protein powder", "oats", "banana", "eggs"],
    },
    {
      id: "2",
      name: "Chicken & Rice Bowl",
      time: "12:30 PM",
      calories: 680,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=150&fit=crop",
      ingredients: ["chicken breast", "brown rice", "vegetables", "quinoa"],
    },
    {
      id: "3",
      name: "Lean Beef Stir Fry",
      time: "7:30 PM",
      calories: 590,
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=150&fit=crop",
      ingredients: ["lean beef", "mixed vegetables", "brown rice", "soy sauce"],
    },
  ],
};

const DietCard: React.FC<{ diet: DietOption; onPress: () => void }> = ({
  diet,
  onPress,
}) => (
  <Card
    style={[styles.card, { backgroundColor: diet.color }]}
    onPress={onPress}
  >
    <View style={styles.cardContent}>
      <View style={styles.cardText}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{diet.title}</Text>
          {diet.goal === "muscle_gain" && (
            <TrendingUp size={20} color="#4CAF50" />
          )}
          {diet.goal === "weight_loss" && (
            <TrendingDown size={20} color="#FF5722" />
          )}
        </View>
        <Text style={styles.cardDescription}>{diet.description}</Text>
        <View style={styles.cardStats}>
          <Text style={styles.statText}>{diet.calories} cal</Text>
          <Text style={styles.statText}>•</Text>
          <Text style={styles.statText}>{diet.duration}</Text>
        </View>
        <Button
          mode="text"
          onPress={onPress}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          icon={({ size, color }) => <ChevronRight size={size} color={color} />}
        >
          View diet
        </Button>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: diet.image }} style={styles.cardImage} />
      </View>
    </View>
  </Card>
);

const MealCard: React.FC<{ meal: MealPlan }> = ({ meal }) => (
  <Card style={styles.mealCard}>
    <View style={styles.mealContent}>
      <Image source={{ uri: meal.image }} style={styles.mealImage} />
      <View style={styles.mealInfo}>
        <View style={styles.mealHeader}>
          <Text style={styles.mealName}>{meal.name}</Text>
          <Text style={styles.mealCalories}>{meal.calories} cal</Text>
        </View>
        <View style={styles.mealTime}>
          <Clock size={14} color="#666" />
          <Text style={styles.mealTimeText}>{meal.time}</Text>
        </View>
        <View style={styles.ingredients}>
          {meal.ingredients.slice(0, 3).map((ingredient, index) => (
            <Chip
              key={index}
              style={styles.ingredientChip}
              textStyle={styles.chipText}
            >
              {ingredient}
            </Chip>
          ))}
          {meal.ingredients.length > 3 && (
            <Text style={styles.moreIngredients}>
              +{meal.ingredients.length - 3} more
            </Text>
          )}
        </View>
      </View>
    </View>
  </Card>
);

const DietDetailScreen: React.FC<{
  diet: DietOption;
  onBack: () => void;
}> = ({ diet, onBack }) => {
  const meals = sampleMealPlans[diet.id] || [];
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "#4CAF50";
      case "Medium":
        return "#FF9800";
      case "Hard":
        return "#F44336";
      default:
        return "#666";
    }
  };

  const getGoalIcon = () => {
    if (diet.goal === "muscle_gain")
      return <TrendingUp size={24} color="#4CAF50" />;
    if (diet.goal === "weight_loss")
      return <TrendingDown size={24} color="#FF5722" />;
    return <Target size={24} color="#2196F3" />;
  };

  const getGoalText = () => {
    if (diet.goal === "muscle_gain") return "Muscle Gain";
    if (diet.goal === "weight_loss") return "Weight Loss";
    return "Balanced Nutrition";
  };

  return (
    <ScrollView
      style={styles.detailContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#2E2E2E" />
        </TouchableOpacity>
        <Text style={styles.detailTitle}>{diet.title} Diet</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.heroSection}>
        <Image source={{ uri: diet.image }} style={styles.heroImage} />
        <View style={styles.heroOverlay}>
          <View style={styles.goalBadge}>
            {getGoalIcon()}
            <Text style={styles.goalText}>{getGoalText()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailContent}>
        <Text style={styles.detailDescription}>{diet.description}</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{diet.calories}</Text>
            <Text style={styles.statLabel}>Daily Calories</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{diet.duration}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statCard}>
            <Text
              style={[
                styles.statValue,
                { color: getDifficultyColor(diet.difficulty) },
              ]}
            >
              {diet.difficulty}
            </Text>
            <Text style={styles.statLabel}>Difficulty</Text>
          </View>
        </View>

        <View style={styles.macroSection}>
          <Text style={styles.sectionTitle}>Macronutrient Breakdown</Text>
          <View style={styles.macroGrid}>
            <View style={styles.macroCard}>
              <Text style={styles.macroValue}>{diet.protein}</Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>
            <View style={styles.macroCard}>
              <Text style={styles.macroValue}>{diet.carbs}</Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>
            <View style={styles.macroCard}>
              <Text style={styles.macroValue}>{diet.fats}</Text>
              <Text style={styles.macroLabel}>Fats</Text>
            </View>
          </View>
        </View>

        {meals.length > 0 && (
          <View style={styles.mealsSection}>
            <View style={styles.mealsSectionHeader}>
              <Text style={styles.sectionTitle}>Sample Meal Plan</Text>
              <View style={styles.totalCalories}>
                <Utensils size={16} color="#4CAF50" />
                <Text style={styles.totalCaloriesText}>
                  {totalCalories} cal/day
                </Text>
              </View>
            </View>

            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </View>
        )}

        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Key Benefits</Text>
          <View style={styles.benefitsList}>
            {diet.goal === "muscle_gain" && (
              <>
                <View style={styles.benefitItem}>
                  <TrendingUp size={16} color="#4CAF50" />
                  <Text style={styles.benefitText}>
                    Promotes muscle protein synthesis
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Target size={16} color="#4CAF50" />
                  <Text style={styles.benefitText}>
                    Optimized for strength training
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Apple size={16} color="#4CAF50" />
                  <Text style={styles.benefitText}>
                    High-quality protein sources
                  </Text>
                </View>
              </>
            )}
            {diet.goal === "weight_loss" && (
              <>
                <View style={styles.benefitItem}>
                  <TrendingDown size={16} color="#FF5722" />
                  <Text style={styles.benefitText}>Promotes fat burning</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Target size={16} color="#FF5722" />
                  <Text style={styles.benefitText}>Maintains muscle mass</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Apple size={16} color="#FF5722" />
                  <Text style={styles.benefitText}>
                    Reduces appetite naturally
                  </Text>
                </View>
              </>
            )}
            {diet.goal === "balanced" && (
              <>
                <View style={styles.benefitItem}>
                  <Target size={16} color="#2196F3" />
                  <Text style={styles.benefitText}>
                    Balanced nutrition approach
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Apple size={16} color="#2196F3" />
                  <Text style={styles.benefitText}>Sustainable long-term</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Users size={16} color="#2196F3" />
                  <Text style={styles.benefitText}>
                    Suitable for most people
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        <Button
          mode="contained"
          style={styles.startButton}
          contentStyle={styles.startButtonContent}
          labelStyle={styles.startButtonLabel}
        >
          Start This Diet Plan
        </Button>
      </View>
    </ScrollView>
  );
};

const DietScreen: React.FC = ({ navigation }: any) => {
  const [selectedDiet, setSelectedDiet] = useState<DietOption | null>(null);

  const handleDietPress = (diet: DietOption) => {
    setSelectedDiet(diet);
  };

  const handleBack = () => {
    setSelectedDiet(null);
  };

  if (selectedDiet) {
    return (
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <DietDetailScreen diet={selectedDiet} onBack={handleBack} />
        </SafeAreaView>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Diet Plans</Text>
              <Text style={styles.headerSubtitle}>
                Choose the perfect diet plan
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color="#2E2E2E" />
            </TouchableOpacity>
          </View>

          <View style={styles.goalFilters}>
            <Chip
              icon={() => <Target size={12} color="#4CAF50" />}
              style={styles.filterChip}
              textStyle={{ fontSize: 12 }}
            >
              All Goals
            </Chip>
            <Chip
              icon={() => <TrendingUp size={16} color="#4CAF50" />}
              style={styles.filterChip}
              textStyle={{ fontSize: 12 }}
            >
              Muscle Gain
            </Chip>
            <Chip
              icon={() => <TrendingDown size={16} color="#FF5722" />}
              style={styles.filterChip}
              textStyle={{ fontSize: 12 }}
            >
              Weight Loss
            </Chip>
          </View>

          <View style={styles.cardsContainer}>
            {dietOptions.map((diet) => (
              <DietCard
                key={diet.id}
                diet={diet}
                onPress={() => handleDietPress(diet)}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollView: {
    flex: 1,
    backgroundColor: "#F8F9FA",

  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
   
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 22,
  },
  goalFilters: {
    flexDirection: "row",

    paddingHorizontal: 10,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: "#FFFFFF",
  },
  filterChip: {
    backgroundColor: "#F0F0F0",
  },
  cardsContainer: {
    paddingHorizontal: 10,
    paddingTop: 16,
    gap: 16,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardContent: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  cardText: {
    flex: 1,
    paddingRight: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2E2E2E",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
    lineHeight: 20,
  },
  cardStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  statText: {
    fontSize: 12,
    color: "#888888",
    fontWeight: "500",
  },
  buttonContent: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    paddingHorizontal: 0,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4CAF50",
    marginLeft: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  // Detail Screen Styles
  detailContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 8,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E2E2E",
  },
  placeholder: {
    width: 40,
  },
  heroSection: {
    position: "relative",
    height: 200,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 16,
    left: 20,
    right: 20,
  },
  goalBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    gap: 6,
  },
  goalText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E2E2E",
  },
  detailContent: {
    padding: 20,
  },
  detailDescription: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
  },
  macroSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2E2E2E",
    marginBottom: 16,
  },
  macroGrid: {
    flexDirection: "row",
    gap: 12,
  },
  macroCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  macroValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4CAF50",
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 14,
    color: "#666666",
  },
  mealsSection: {
    marginBottom: 24,
  },
  mealsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalCalories: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  totalCaloriesText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
  },
  mealCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mealContent: {
    flexDirection: "row",
    padding: 16,
  },
  mealImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  mealInfo: {
    flex: 1,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E2E2E",
    flex: 1,
  },
  mealCalories: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
  },
  mealTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
  },
  mealTimeText: {
    fontSize: 14,
    color: "#666666",
  },
  ingredients: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "center",
  },
  ingredientChip: {
    backgroundColor: "#F0F0F0",
    height: 24,
  },
  chipText: {
    fontSize: 11,
    color: "#666666",
  },
  moreIngredients: {
    fontSize: 12,
    color: "#888888",
    fontStyle: "italic",
  },
  benefitsSection: {
    marginBottom: 32,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  benefitText: {
    fontSize: 14,
    color: "#2E2E2E",
    flex: 1,
  },
  startButton: {
    borderRadius: 12,
    elevation: 2,
  },
  startButtonContent: {
    paddingVertical: 8,
  },
  startButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DietScreen;
