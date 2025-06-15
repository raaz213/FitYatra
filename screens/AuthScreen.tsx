import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";

import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import { User } from "../types/auth/auth";

const { height: screenHeight } = Dimensions.get("screen");

const AuthScreen = () => {

  const[userData, setUserData]= useState<User>({
    name : '',
    email : '',
    password : '',
    height: 0,
    weight: 0,
    age:0,
    gender:'male',
    role:'user'
  });
  const [currentScreen, setCurrentScreen] = useState<"login" | "signup">(
    "signup"
  );

  return (
    <SafeAreaView style={[styles.container, , { height: screenHeight }]}>
      {/* Background Gradient */}
      <ImageBackground
        source={{
          uri: "https://cdn.pixabay.com/photo/2024/07/01/17/11/woman-8865733_640.png",
        }}
        style={styles.imageBackground}
        
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>RADIX</Text>
          </View>
        </View>

        {/* Screen Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              currentScreen === "login" && styles.activeToggle,
            ]}
            onPress={() => setCurrentScreen("login")}
          >
            <Text
              style={[
                styles.toggleText,
                currentScreen === "login" && styles.activeToggleText,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              currentScreen === "signup" && styles.activeToggle,
            ]}
            onPress={() => setCurrentScreen("signup")}
          >
            <Text
              style={[
                styles.toggleText,
                currentScreen === "signup" && styles.activeToggleText,
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Render Current Screen */}
        {currentScreen === "login" ? (
          <LoginScreen userData={userData} onSwitchToSignUp={() => setCurrentScreen("signup")} />
        ) : (
          <SignUpScreen setUserData={setUserData} onSwitchToLogin={() => setCurrentScreen("login")} />
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>www.radixweb.com</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: "flex-end",
  },
  logo: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  logoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 25,
    marginHorizontal: 50,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 25,
  },
  activeToggle: {
    backgroundColor: "white",
  },
  toggleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  activeToggleText: {
    color: "#2d5a4a",
  },
  footer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "flex-end",
  },
  footerText: {
    color: "white",
    fontSize: 12,
    opacity: 0.7,
  },
});

export default AuthScreen;
