import { StyleSheet } from "react-native";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./navigation/MainNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WorkoutContextProvider } from "./context/WorkoutContext";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WorkoutContextProvider>
        <PaperProvider>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </PaperProvider>
      </WorkoutContextProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
