import { StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import React from "react";

type AppbarHeaderProps = {
  currentWorkout: {
    subtitle: string;
  };
};

const AppbarHeader: React.FC<AppbarHeaderProps> = ({ currentWorkout }) => {
  const theme = useTheme();
  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content
        title="WORKOUT PLAN"
        subtitle={currentWorkout.subtitle}
        titleStyle={styles.headerTitle}
        subtitleStyle={styles.headerSubtitle}
      />
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
  headerSubtitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
