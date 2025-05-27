import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const EditProfileButton = () => {
  return (
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
