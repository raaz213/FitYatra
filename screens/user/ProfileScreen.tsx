import React from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/user/profile/Header";
import GoalCard from "../../components/user/profile/GoalCard";
import MenuItem from "../../components/user/profile/MenuItem";
import UserStats from "../../components/user/profile/UserStats";
import CaloriesBurnChart from "../../components/user/profile/CaloriesBurnChart";
import EditProfileButton from "../../components/user/profile/EditProfileButton";
import ToastManager from "toastify-react-native/components/ToastManager";

const ProfileScreen: React.FC = ({ navigation }: any) => {
  return (
    <LinearGradient colors={["#d3e1ed", "#d3e1ed"]} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <ToastManager />

        <Header />
        <CaloriesBurnChart />
        <GoalCard />
        <UserStats />
        <MenuItem />
        <EditProfileButton navigation={navigation} />
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSpacing: {
    height: 30,
  },
});

export default ProfileScreen;
