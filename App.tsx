import {  StyleSheet} from "react-native";
import React from "react";
import { Provider as PaperProvider} from "react-native-paper";
import ToastManager from "toastify-react-native/components/ToastManager";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./navigation/MainNavigation";



const App = () => {
  return (

    <PaperProvider>
     <NavigationContainer>
        <MainNavigation />
     </NavigationContainer>
    </PaperProvider>

  );
};

export default App;

const styles = StyleSheet.create({});
