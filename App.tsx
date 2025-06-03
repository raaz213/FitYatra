import {  StyleSheet} from "react-native";
import React from "react";
import UserLayoutScreen from "./screens/user/UserLayoutScreen";
import { Provider as PaperProvider} from "react-native-paper";
import AdminLayoutScreen from "./screens/admin/AdminLayoutScreen";

const App = () => {
  return (
    <PaperProvider>
      {/* <UserLayoutScreen /> */}
      <AdminLayoutScreen />
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
