import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/AuthScreen";
import AdminDrawerNavigator from "./admin/AdminDrawerNavigator";
import UserDrawerNavigator from "./user/UserDrawerNavigator";

const Stack = createStackNavigator();


function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="User" component={UserDrawerNavigator} />
      <Stack.Screen name="Admin" component={AdminDrawerNavigator} />

    </Stack.Navigator>
  )
}

export default MainNavigation