import { createStackNavigator } from "@react-navigation/stack";
import UserLayoutScreen from "../screens/user/UserLayoutScreen";
import AdminLayoutScreen from "../screens/admin/AdminLayoutScreen";
import AuthScreen from "../screens/AuthScreen";

const Stack = createStackNavigator();


function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="User" component={UserLayoutScreen} />
      <Stack.Screen name="Admin" component={AdminLayoutScreen} />

    </Stack.Navigator>
  )
}

export default MainNavigation