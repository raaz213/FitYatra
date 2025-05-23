import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import { StyleSheet, View } from "react-native";
import NutritionScreen from "../../screens/user/NutritionScreen";
import ExerciseScreen from "../../screens/user/ExerciseScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "FitYatra",
        headerStyle: {
          backgroundColor: "#05065c",
        },
        headerTintColor: "#fff",
        headerRightContainerStyle: {
          paddingRight: 16,
        },
      }}
    >
      <Drawer.Screen name="Main" component={TabNavigator} />
      <Drawer.Screen name="Exercise" component={ExerciseScreen} />
      <Drawer.Screen name="Nutrition" component={NutritionScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
