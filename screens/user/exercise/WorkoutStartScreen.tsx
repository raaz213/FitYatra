"use client";

import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RenderReadyState from "../../../components/user/workoutStart/RenderReadyState";
import RenderExerciseState from "../../../components/user/workoutStart/RenderExerciseState";
import TopControls from "../../../components/user/workoutStart/TopControls";
import LeftControls from "../../../components/user/workoutStart/LeftControls";
import RightControls from "../../../components/user/workoutStart/RightControls";
import ProgressBar from "../../../components/user/workoutStart/ProgressBar";

interface Exercise {
  id: string;
  name: string;
  image: string;
  reps: number;
  sets: number;
  instruction: string;
  totalExercises: number;
  currentExercise: number;
}

const exerciseData: Exercise = {
  id: "1",
  name: "MOUNTAIN CLIMBER",
  image:
    "https://cdnb.artstation.com/p/assets/images/images/037/461/437/original/digital-artist-leg-pull-in.gif?1620422767",
  reps: 12,
  sets: 3,
  instruction: "Each Side x 6",
  totalExercises: 15,
  currentExercise: 1,
};

type WorkoutState = "ready" | "countdown" | "exercise" | "rest";

export default function WorkoutSScreen({ navigation }: any) {
  const theme = useTheme();
  const [workoutState, setWorkoutState] = useState<WorkoutState>("ready");
  const [readyTimer, setReadyTimer] = useState(15);
  const [exerciseTimer, setExerciseTimer] = useState(30);
  const [currentRep, setCurrentRep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Ready timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (workoutState === "ready" && readyTimer > 0 && !isPaused) {
      interval = setInterval(() => {
        setReadyTimer((prev) => {
          if (prev <= 1) {
            setWorkoutState("exercise");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [workoutState, readyTimer, isPaused]);

  // Exercise timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (workoutState === "exercise" && exerciseTimer > 0 && !isPaused) {
      interval = setInterval(() => {
        setExerciseTimer((prev) => {
          if (prev <= 1) {
            handleExerciseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [workoutState, exerciseTimer, isPaused]);

  // Pulse animation for ready state
  useEffect(() => {
    if (workoutState === "ready") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scaleAnim.setValue(1);
    }
  }, [workoutState]);

  // Progress animation
  useEffect(() => {
    const progress =
      workoutState === "ready"
        ? (15 - readyTimer) / 15
        : (30 - exerciseTimer) / 30;

    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [readyTimer, exerciseTimer, workoutState]);

  const handleExerciseComplete = () => {
    setCurrentRep(currentRep + 1);
    if (currentRep + 1 >= exerciseData.reps) {
      // Exercise completed
      console.log("Exercise completed!");
    } else {
      // Reset for next rep
      setExerciseTimer(30);
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleNext = () => {
    if (workoutState === "ready") {
      setWorkoutState("exercise");
      setReadyTimer(0);
    } else {
      handleExerciseComplete();
    }
  };

  const handleRestart = () => {
    setWorkoutState("ready");
    setReadyTimer(15);
    setExerciseTimer(30);
    setCurrentRep(0);
    setIsPaused(false);
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {/* Top Controls */}
        <TopControls navigation={navigation} handleRestart={handleRestart} />

        {/* Side Controls */}
        <LeftControls isSoundOn={isSoundOn} toggleSound={toggleSound} />

        <RightControls isPaused={isPaused} handlePause={handlePause} />

        {/* Progress Bar */}
        <ProgressBar progressAnim={progressAnim} />

        {/* Main Content */}
        {workoutState === "ready" ? (
          <RenderReadyState
            exerciseData={exerciseData}
            scaleAnim={scaleAnim}
            progressAnim={progressAnim}
            handleNext={handleNext}
            readyTimer={readyTimer}
          />
        ) : (
          <RenderExerciseState
            exerciseData={exerciseData}
            handleExerciseComplete={handleExerciseComplete}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
