// components/user/profile/EditProfileButton.tsx
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { logoutUser } from "../../../services/auth/auth";

const EditProfileButton = ({ navigation }: any) => {
  const handleEditPress = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <View style={styles.buttonContainer}>
      <Button
        mode="contained"
        onPress={handleEditPress}
        style={styles.editButton}
        contentStyle={styles.editButtonContent}
        labelStyle={styles.editButtonLabel}
      >
        Edit Profile
      </Button>
      <View style={{marginTop:15}}>
         <Button textColor="#06407a" onPress={() => logoutUser(navigation)} mode="outlined">
        Logout
      </Button>
      </View>
    </View>
    
  );
};

export default EditProfileButton;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  editButton: {
    borderRadius: 25,
    backgroundColor: "#06407a",
  },
  editButtonContent: {
    paddingVertical: 8,
  },
  editButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
