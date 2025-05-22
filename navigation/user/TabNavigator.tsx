// navigation/user/TabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
       
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        
      />
      <Tab.Screen 
        name="About" 
        component={AboutScreen}
       
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen}
       
      />
    </Tab.Navigator>
  );
}