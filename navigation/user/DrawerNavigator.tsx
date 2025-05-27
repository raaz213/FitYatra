import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import NutritionScreen from "../../screens/user/nutrition/NutritionScreen";
import ExerciseScreen from "../../screens/user/exercise/ExerciseScreen";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutScreen from "../../screens/user/exercise/WorkoutScreen";
import WorkoutDetailsScreen from "../../screens/user/exercise/WorkoutDetailsScreen";
import WorkoutStartScreen from "../../screens/user/exercise/WorkoutStartScreen";
import DietScreen from "../../screens/user/nutrition/DietScreen";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const ExerciseStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkoutExercise" component={ExerciseScreen} />
      <Stack.Screen name="Workout" component={WorkoutScreen} />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
      <Stack.Screen name="WorkoutStart" component={WorkoutStartScreen} />
    </Stack.Navigator>
  );
};

const NutritionStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Nutrition" component={NutritionScreen} />
      <Stack.Screen name="Diet" component={DietScreen} />
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
            colors={["#4c669f", "#3b5998", "#192f6a"]}
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
