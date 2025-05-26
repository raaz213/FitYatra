// navigation/user/TabNavigator.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import HomeScreen from "../../screens/user/HomeScreen";
import ProfileScreen from "../../screens/user/ProfileScreen";
import AboutScreen from "../../screens/user/AboutScreen";
import ChatScreen from "../../screens/user/ChatScreen";
import TabBar from "./TabBar";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const navigation = useNavigation<any>();
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
            <MaterialCommunityIcons name="home" color={"white"} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={"white"} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={"white"} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" color={"white"} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
