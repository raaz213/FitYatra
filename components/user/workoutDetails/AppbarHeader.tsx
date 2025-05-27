import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar, useTheme } from "react-native-paper";

interface ExerciseData{
    name: string
}
const AppbarHeader = ({ navigation, exerciseData }: {navigation: any, exerciseData: ExerciseData}) => {
  const theme = useTheme();
  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content
        title={exerciseData.name}
        titleStyle={styles.headerTitle}
      />
    </Appbar.Header>
  );
};

export default AppbarHeader;

const styles = StyleSheet.create({
  headerTitle: { fontSize: 12, fontWeight: "700", letterSpacing: 0.5 },
});
