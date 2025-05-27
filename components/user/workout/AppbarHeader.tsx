import { StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import React from "react";

type AppbarHeaderProps = {
  currentWorkout: {
    subtitle: string;
  };
  navigation:any;
};

const AppbarHeader: React.FC<AppbarHeaderProps> = ({navigation, currentWorkout}) => {
  const theme = useTheme();
  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
      <Appbar.BackAction onPress={() => navigation.goBack()}/>
      <Appbar.Content title="WORKOUT PLAN" titleStyle={styles.headerTitle} />
      <Appbar.Action icon="refresh" onPress={() => {}} />
    </Appbar.Header>
  );
};

export default AppbarHeader;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.8,
    letterSpacing: 1,
  },
});
