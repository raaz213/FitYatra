// navigation/user/TabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import HomeScreen from '../../screens/user/HomeScreen';
import ProfileScreen from '../../screens/user/ProfileScreen';
import AboutScreen from '../../screens/user/AboutScreen';
import ChatScreen from '../../screens/user/ChatScreen';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator 
    
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: true,
       animation: 'shift',
       
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
       options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="account" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="About" 
        component={AboutScreen}
       options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="book" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen}
       options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="chat" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}