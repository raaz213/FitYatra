// screens/user/Layout.tsx
import React from 'react';
import { StyleSheet, StatusBar, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import TabNavigator from '../../navigation/user/TabNavigator';

const Layout = () => {
  

  return (
    <>
     
      <NavigationContainer >
        <TabNavigator />
      </NavigationContainer>
    </>
  );
};

export default Layout;