import React from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/user/profile/Header";
import GoalCard from "../../components/user/profile/GoalCard";
import MenuItem from "../../components/user/profile/MenuItem";
import UserStats from "../../components/user/profile/UserStats";
import CaloriesBurnChart from "../../components/user/profile/CaloriesBurnChart";

const ProfileScreen: React.FC = () => {
  return (
    <LinearGradient colors={["#6f6f73", "#fafafc"]} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Header />
        <CaloriesBurnChart />
        <GoalCard />
        <UserStats />
        <MenuItem />

        {/* Edit Profile Button */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.editButton}
            contentStyle={styles.editButtonContent}
            labelStyle={styles.editButtonLabel}
          >
            Edit Profile
          </Button>
        </View>
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  editButton: {
    borderRadius: 25,
    backgroundColor: "#667eea",
  },
  editButtonContent: {
    paddingVertical: 8,
  },
  editButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 30,
  },
});

export default ProfileScreen;
