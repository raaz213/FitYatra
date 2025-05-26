import {  StyleSheet} from "react-native";
import React from "react";
import Layout from "./screens/user/Layout";
import { Provider } from "react-native-paper";

const App = () => {
  return (
    <Provider>
      <Layout />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
