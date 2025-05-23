// screens/user/Layout.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "../../navigation/user/DrawerNavigator";

const Layout = () => {
  return (
    <>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </>
  );
};

export default Layout;
