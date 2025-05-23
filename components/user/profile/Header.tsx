import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

const Header = () => {
  return (
    <View style={styles.header}>
      <Avatar.Image
        size={80}
        source={{
          uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        }}
        style={styles.avatar}
      
      />
      <Text style={styles.userName}>Alex Johnson</Text>
      <Text style={styles.userEmail}>alex.johnson@email.com</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,

  },
  avatar: {
    marginTop: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 16,
  },
});
