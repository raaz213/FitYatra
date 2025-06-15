// screens/user/Layout.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "../../navigation/user/DrawerNavigator";

const UserLayoutScreen = () => {
  return (
    <>
        <DrawerNavigator />
    </>
  );
};

export default UserLayoutScreen;
