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
};

const UserDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTitle: "FitYatra",
        headerTitleStyle: {
          fontSize: 24,
          letterSpacing: 4,
          fontWeight: 700,
          color: "#111111"
        },
        headerBackground: () => (
          <LinearGradient
            colors={["#81ace6ff", "#81ace6ff"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
      
        headerLeft: () => null,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ paddingRight: 16 }}
          >
            <MaterialCommunityIcons name="menu" color={"#111111"} size={24} />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="Dashboard"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Exercise"
        component={ExerciseStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dumbbell" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Nutrition"
        component={NutritionStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-apple-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default UserDrawerNavigator;
