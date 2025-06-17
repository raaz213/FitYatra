// navigation/user/TabNavigator.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import HomeScreen from "../../screens/user/HomeScreen";
import ProfileScreen from "../../screens/user/ProfileScreen";
import AboutScreen from "../../screens/user/AboutScreen";
import ChatScreen from "../../screens/user/ChatScreen";
import TabBar from "./TabBar";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "../../screens/user/EditProfileScreen";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();


export default function TabNavigator() {

const ProfileStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        
        
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="alert-circle" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
