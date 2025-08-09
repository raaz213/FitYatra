import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const TodaysWorkout = () => {
  // ✅ Dummy data
  const exerciseSubcategories = [
    {
      _id: "1",
      name: "Upper Body Strength",
      dayNumber: "Day 1",
    },
    {
      _id: "2",
      name: "Lower Body Burn",
      dayNumber: "Day 2",
    },
    {
      _id: "3",
      name: "Core & Abs",
      dayNumber: "Day 3",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Workout</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllButton}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Workout Sessions */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {exerciseSubcategories.map((session) => (
          <TouchableOpacity key={session._id} style={styles.sessionCard}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: "https://media.istockphoto.com/id/843435340/photo/body-building-workout.jpg?s=1024x1024&w=is&k=20&c=fBf3rO7V4UDhMXZyqL9ZPZzxTxwR8aYCrRPcZ0zDPZA=",
                }}
                style={styles.sessionImage}
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.imageOverlay}
              />

              {/* Play Button */}
              <View style={styles.playButtonContainer}>
                <View style={styles.playButton}>
                  <View style={styles.playIcon} />
                </View>
              </View>
            </View>

            <View style={styles.sessionInfo}>
              <Text style={styles.sessionTitle}>{session.name}</Text>
              <Text style={styles.sessionDuration}>{session.dayNumber}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TodaysWorkout;



const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#343536",
    letterSpacing: 0.8,
  },
  viewAllButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#06407a",
  },
 
  sessionCard: {
    marginHorizontal: 5,
    width: width * 0.45,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
  },
  sessionImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  playButtonContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "#1a1a1a",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginLeft: 2,
  },
  sessionInfo: {
    paddingHorizontal: 4,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#343536",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sessionDuration: {
    fontSize: 14,
    color: "#888888",
    fontWeight: "400",
  },
});
