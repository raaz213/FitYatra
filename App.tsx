import {  StyleSheet} from "react-native";
import React from "react";
import UserLayoutScreen from "./screens/user/UserLayoutScreen";
import { Provider as PaperProvider} from "react-native-paper";
import AdminLayoutScreen from "./screens/admin/AdminLayoutScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AuthScreen from "./screens/AuthScreen";
import ToastManager from "toastify-react-native/components/ToastManager";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./navigation/MainNavigation";



const App = () => {
  return (

    <PaperProvider>
      <ToastManager />
     <NavigationContainer>
        <MainNavigation />
     </NavigationContainer>
    </PaperProvider>

  );
};

export default App;

const styles = StyleSheet.create({});
