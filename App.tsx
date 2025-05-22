import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthScreen from "./screens/AuthScreen";
import Layout from "./screens/user/Layout";
import { Provider } from "react-native-paper";

const App = () => {
  return (
    <ScrollView>
      {/* <AuthScreen /> */}
      <Provider>
        <Layout />
      </Provider>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({});
