"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  AppState,
  AppStateStatus,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RenderExercise from "../../../components/user/workoutStart/RenderExercise";
import { WorkoutContext } from "../../../context/WorkoutContext";
import { stopWorkout } from "../../../services/user/exercise/Exercise";
import { useFocusEffect } from "@react-navigation/native";

export default function WorkoutStartScreen({ navigation, route }: any) {
  const theme = useTheme();
  const { exerciseData } = route.params;
  const [timer, setTimer] = useState(exerciseData.duration);
  const [isActive, setIsActive] = useState(true);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { workoutId }: any = useContext(WorkoutContext);
  const currentWorkoutId = useRef<string | null>(null);

  const appState = useRef(AppState.currentState);
  const hasStopped = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    // Save the latest workoutId in ref
    currentWorkoutId.current = workoutId;
  }, [workoutId]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timer <= 0 && !hasStopped.current) {
      handleWorkoutStop(false);
    }

    if (isActive && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prev: number) => prev - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, timer]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current === "active" &&
        (nextAppState === "inactive" || nextAppState === "background")
      ) {
        if (!hasStopped.current) {
          handleWorkoutStop(false);
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  // Unified stop function
  const handleWorkoutStop = async (shouldNavigate: boolean) => {
    if (hasStopped.current) return;

    hasStopped.current = true;
    setIsActive(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const idToStop = currentWorkoutId.current;
    if (!idToStop) {
      console.warn("No valid workoutId to stop.");
      return;
    }

    try {
      await stopWorkout(idToStop);
      console.log("Workout stopped successfully:", idToStop);
      if (shouldNavigate && isMounted.current) {
        navigation.goBack();
      }
    } catch (error) {
      console.log("Error stopping workout:", error);
    }
  };

  const handleClose = () => handleWorkoutStop(true);
  const handleStop = () => handleWorkoutStop(true);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (!hasStopped.current && isMounted.current) {
          handleWorkoutStop(false);
        }
      };
    }, [])
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.topControls}>
            <TouchableOpacity
              style={[styles.controlButton, styles.closeButton]}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.controlIcon, { color: theme.colors.onSurface }]}
              >
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: "rgba(6, 64, 122, 0.15)" },
              ]}
            >
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: "#06407a",
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
          </View>

          {/* Main Content */}
          <RenderExercise
            exerciseData={exerciseData}
            scaleAnim={scaleAnim}
            progressAnim={progressAnim}
            timer={timer}
          />

          <View style={styles.rightControls}>
            <TouchableOpacity
              style={[styles.controlButton, styles.stopButton]}
              onPress={handleStop}
              activeOpacity={0.7}
            >
              <Text style={[styles.controlIcon, { color: "#ffffff" }]}>⏹</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  stopButton: {
    backgroundColor: "#ff4757",
  },
  controlIcon: {
    fontSize: 20,
    fontWeight: "700",
  },
  rightControls: {
    position: "absolute",
    right: 20,
    top: "50%",
    zIndex: 10,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
});
