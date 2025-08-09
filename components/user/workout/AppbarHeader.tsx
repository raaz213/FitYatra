import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar, useTheme } from "react-native-paper";


const AppbarHeader = ({ navigation, title }: {navigation: any, title:string }) => {
  const theme = useTheme();
  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content
        title={title}
        titleStyle={styles.headerTitle}
      />
    </Appbar.Header>
  );
};

export default AppbarHeader;

const styles = StyleSheet.create({
  headerTitle: { fontSize: 16, fontWeight: "700", letterSpacing: 0.5 },
});
