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
  const workoutSessions = [
    {
      id: 1,
      title: "Day 1",
      duration: "45min session",
      image:
        "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300",
    },
    {
      id: 2,
      title: "Day 2",
      duration: "45min session",
      image:
        "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300",
    },
    {
      id: 3,
      title: "Day 3",
      duration: "30min session",
      image:
        "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300",
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        
      >
        {workoutSessions.map((session) => (
          <TouchableOpacity key={session.id} style={styles.sessionCard}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: session.image }}
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
              <Text style={styles.sessionTitle}>{session.title}</Text>
              <Text style={styles.sessionDuration}>{session.duration}</Text>
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
    paddingBottom: 20,
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
    color: "red",
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
