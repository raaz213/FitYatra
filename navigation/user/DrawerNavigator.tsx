import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import NutritionScreen from "../../screens/user/NutritionScreen";
import ExerciseScreen from "../../screens/user/ExerciseScreen";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Drawer = createDrawerNavigator();

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
      <Drawer.Screen name="Exercise" component={ExerciseScreen} />
      <Drawer.Screen name="Nutrition" component={NutritionScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
