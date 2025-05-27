import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerCard}>
        <Avatar.Image
          size={90}
          source={{
            uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>Alex Johnson</Text>
        <Text style={styles.userEmail}>alex.johnson@email.com</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
 
    paddingVertical: 18,
 
    alignItems: "center",
  },
  headerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
    width: "100%",
    maxWidth: 360,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  avatar: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  userEmail: {
    fontSize: 15,
    color: "#64748b",
    fontWeight: "500",
    letterSpacing: 0.2,
  },
});