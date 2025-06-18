"use client";

import { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
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

export default function WorkoutStartScreen({ navigation, route }: any) {
  const theme = useTheme();
  const { exerciseData } = route.params;
  const [timer, setTimer] = useState(exerciseData.duration);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const { workoutId }: any = useContext(WorkoutContext);

  const appState = useRef(AppState.currentState);
  const hasStopped = useRef(false); // 🔒 Prevents multiple API calls

  // 🕒 Countdown and stop when timer reaches 0
  useEffect(() => {
    if (timer === 0 && !hasStopped.current) {
      hasStopped.current = true;
      stopWorkout(workoutId).then((res) => {
        console.log("Workout auto-stopped at 0:", res);
      });
    }

    if (timer > 0) {
      const handler = setInterval(() => {
        setTimer((prev: number) => prev - 1);
      }, 1000);
      return () => clearInterval(handler);
    }
  }, [timer]);

  // 🧠 Detect app state changes (background/exit)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/active/) &&
        (nextAppState === "inactive" || nextAppState === "background")
      ) {
        if (!hasStopped.current) {
          hasStopped.current = true;
          stopWorkout(workoutId).then((res) => {
            console.log("Workout stopped on app exit:", res);
          });
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleStop = async () => {
    if (!hasStopped.current) {
      hasStopped.current = true;
      try {
        await stopWorkout(workoutId);
        console.log("Workout manually stopped.");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.controlButton} onPress={handleClose}>
            <Text
              style={[styles.controlIcon, { color: theme.colors.onSurfaceVariant }]}
            >
              ✕
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View
          style={[
            styles.progressBar,
            { backgroundColor: theme.colors.surfaceVariant },
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

        {/* Main Content */}
        <RenderExercise
          exerciseData={exerciseData}
          scaleAnim={scaleAnim}
          progressAnim={progressAnim}
          timer={timer}
        />
        <View style={styles.rightControls}>
          <TouchableOpacity style={styles.controlButton} onPress={handleStop}>
            <Text
              style={[styles.controlIcon, { color: theme.colors.onSurfaceVariant }]}
            >
              ⏸
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  controlIcon: {
    fontSize: 18,
    fontWeight: "600",
  },
  rightControls: {
    position: "absolute",
    right: 20,
    top: "50%",
    zIndex: 10,
  },
  progressBar: {
    height: 4,
    marginHorizontal: 20,
    borderRadius: 2,
    marginTop: 20,
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
});
