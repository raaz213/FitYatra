import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import ExerciseScreen from "../../screens/user/exercise/ExerciseScreen";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutScreen from "../../screens/user/exercise/WorkoutScreen";
import WorkoutDetailsScreen from "../../screens/user/exercise/WorkoutDetailsScreen";
import WorkoutStartScreen from "../../screens/user/exercise/WorkoutStartScreen";
import NutritionCategoryScreen from "../../screens/user/nutrition/NutritionCategoryScreen";
import NutritionFoodsScreen from "../../screens/user/nutrition/NutritionFoodsScreen";
import NutritionDetailsScreen from "../../screens/user/nutrition/NutritionDetailsScreen";
import CameraScreen from "../../screens/user/nutrition/CameraScreen";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const ExerciseStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExerciseHome" component={ExerciseScreen} />
      <Stack.Screen name="Workout" component={WorkoutScreen} />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
      <Stack.Screen name="WorkoutStart" component={WorkoutStartScreen} />
    </Stack.Navigator>
  );
};

const NutritionStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NutritionCategory" component={NutritionCategoryScreen} />
      <Stack.Screen name="NutritionFoods" component={NutritionFoodsScreen} />
      <Stack.Screen name="NutritionDetails" component={NutritionDetailsScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
}

const DrawerNavigator = () => {

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTitle: "FitYatra",
        headerTitleStyle: {
          fontSize: 20,
          letterSpacing: 4,
        
        },
        headerBackground: () => (
          <LinearGradient
            colors={["#06407a", "#3b5998", "#06407a"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerTintColor: "#fff",

        // Remove default left hamburger menu
        headerLeft: () => null,

        // Add custom hamburger menu on the right side
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ paddingRight: 16 }}
          >
            <MaterialCommunityIcons name="menu" color={"white"} size={24} />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="Dashboard" component={TabNavigator} />
      <Drawer.Screen name="Exercise" component={ExerciseStack} />
      <Drawer.Screen name="Nutrition" component={NutritionStack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
