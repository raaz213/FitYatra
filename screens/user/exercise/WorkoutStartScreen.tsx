"use client";

import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  AppState,
  type AppStateStatus,
  Text as RNText,
  Image,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { API_URL } from "../../../constants/apiUrl";
import { startWorkout, stopWorkout } from "../../../services/both/exercise/Workout";
import { Pause, Play } from "lucide-react-native";

interface RenderExerciseProps {
  exerciseData: {
    name: string;
    image: string;
  };
  scaleAnim: any;
  progressAnim: any;
  timer: number;
  isPreparationRunning: boolean;
}

const RenderExercise: React.FC<RenderExerciseProps> = ({
  exerciseData,
  scaleAnim,
  progressAnim,
  timer,
  isPreparationRunning,
}) => {
  const theme = useTheme();

  return (
    <View style={renderExerciseStyles.contentContainer}>
      <Animated.View
        style={[
          renderExerciseStyles.imageContainer,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={renderExerciseStyles.imageWrapper}>
          <Image
            source={{ uri: `${API_URL}/uploads/${exerciseData.image}` }}
            style={renderExerciseStyles.exerciseImage}
            resizeMode="contain"
          />
          <View style={renderExerciseStyles.imageOverlay} />
        </View>
      </Animated.View>

      <View style={renderExerciseStyles.readyContainer}>
        <View
          style={[
            renderExerciseStyles.readyBadge,
            { backgroundColor: isPreparationRunning ? "#ff6b35" : "#06407a" },
          ]}
        >
          <RNText style={renderExerciseStyles.readyText}>
            {isPreparationRunning ? "GET READY!" : "READY TO GO!"}
          </RNText>
        </View>
      </View>

      <View style={renderExerciseStyles.exerciseNameContainer}>
        <RNText
          style={[
            renderExerciseStyles.exerciseName,
            { color: theme.colors.onSurface },
          ]}
        >
          {exerciseData.name}
        </RNText>
      </View>

      <View style={renderExerciseStyles.timerContainer}>
        <View style={renderExerciseStyles.timerWrapper}>
          <View
            style={[
              renderExerciseStyles.circularTimer,
              {
                borderColor: isPreparationRunning
                  ? "rgba(255, 107, 53, 0.2)"
                  : "rgba(6, 64, 122, 0.2)",
              },
            ]}
          >
            <Animated.View
              style={[
                renderExerciseStyles.progressRing,
                {
                  borderColor: isPreparationRunning ? "#ff6b35" : "#06407a",
                  transform: [
                    {
                      rotate: isPreparationRunning
                        ? `${((15 - timer) / 15) * 360}deg`
                        : progressAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0deg", "360deg"],
                          }),
                    },
                  ],
                },
              ]}
            />
            <View style={renderExerciseStyles.timerInner}>
              <RNText
                style={[
                  renderExerciseStyles.timerText,
                  { color: theme.colors.onSurface },
                ]}
              >
                {Math.max(0, timer)}
              </RNText>
              <RNText
                style={[
                  renderExerciseStyles.timerLabel,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                SEC
              </RNText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function WorkoutStartScreen({ navigation, route }: any) {
  const theme = useTheme();
  const { exerciseData } = route.params;

  // Parse duration once
  const totalWorkoutSeconds = parseInt(exerciseData.duration);

  // State
  const [preparationTimer, setPreparationTimer] = useState(10);
  const [isPreparationRunning, setIsPreparationRunning] = useState(true);
  const [workoutTimer, setWorkoutTimer] = useState(totalWorkoutSeconds);
  const [isWorkoutRunning, setIsWorkoutRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Animations
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const progressBarAnimation = useRef(new Animated.Value(0)).current;
  const screenFadeIn = useRef(new Animated.Value(0)).current;

  const appStateRef = useRef(AppState.currentState);
  const prepIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const workoutIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const workoutStartedRef = useRef(false);
  const activeSecondsRef = useRef(0);
  const workoutIdRef = useRef<string | null>(null);
  const isWorkoutRunningRef = useRef(isWorkoutRunning);

  // Fade-in on mount
  useEffect(() => {
    Animated.timing(screenFadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Preparation countdown
  useEffect(() => {
    if (!isPreparationRunning) return;

    // If countdown finished
    if (preparationTimer <= 0) {
      setIsPreparationRunning(false);
      setIsWorkoutRunning(true);

      // Kick off the progress bar animation for workout
      Animated.timing(progressBarAnimation, {
        toValue: 1,
        duration: totalWorkoutSeconds * 1000,
        useNativeDriver: false,
      }).start();

      return;
    }
    
    // Start or resume the prep interval
    prepIntervalRef.current = setInterval(() => {
      setPreparationTimer((t) => t - 1);
    }, 1000);

    // Cleanup
    return () => {
      if (prepIntervalRef.current) {
        clearInterval(prepIntervalRef.current);
        prepIntervalRef.current = null;
      }
    };
  }, [isPreparationRunning, preparationTimer]);

  // Workout countdown
  useEffect(() => {
    if (!isWorkoutRunning || isPaused) return;

    if (!workoutStartedRef.current) {
      workoutStartedRef.current = true;
      startWorkout(exerciseData._id)
        .then((res) => {
          workoutIdRef.current = res._id;
        })
        .catch(() => console.warn("Error starting workout"));
    }

    workoutIntervalRef.current = setInterval(() => {
      setWorkoutTimer((prev) => {
        if (prev <= 0) {
          clearInterval(workoutIntervalRef.current!);
          workoutIntervalRef.current = null;
          setIsWorkoutRunning(false);
          handleWorkoutStopApi();
          return 0;
        }
        activeSecondsRef.current += 1;
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (workoutIntervalRef.current) {
        clearInterval(workoutIntervalRef.current);
        workoutIntervalRef.current = null;
      }
    };
  }, [isWorkoutRunning, isPaused]);

  //workout countdown animation
  useEffect(() => {
    if (isWorkoutRunning && !isPaused) {
      
      const remainingTime = workoutTimer;

      // Start animation for the remaining time
      Animated.timing(progressBarAnimation, {
        toValue: 1,
        duration: remainingTime * 1000,
        useNativeDriver: false,
      }).start();
    } else {
      // On pause, stop animation
      progressBarAnimation.stopAnimation();
    }
  }, [isWorkoutRunning, isPaused]);

  //start workout
  useEffect(() => {
    if (workoutTimer === 0 && isWorkoutRunning) {
      setIsWorkoutRunning(false);
      handleWorkoutStopApi();
    }
  }, [workoutTimer]);

  //exists app
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appStateRef.current === "active" &&
        (nextAppState === "inactive" || nextAppState === "background") &&
        isWorkoutRunning
      ) {
        setIsWorkoutRunning(false);
        handleWorkoutStopApi();
      }
      appStateRef.current = nextAppState;
    };
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, [isWorkoutRunning]);


  //when screen lose focus
  useEffect(() => {
    isWorkoutRunningRef.current = isWorkoutRunning;
  }, [isWorkoutRunning]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (isWorkoutRunningRef.current) {
          handleWorkoutStopApi();
        }
      };
    }, [])
  );

  // Stop API call
  const handleWorkoutStopApi = async () => {
    const workoutId = workoutIdRef.current;
    if (!workoutId) {
      return;
    }
    try {
      await stopWorkout(workoutId, activeSecondsRef.current);
    } catch {
      console.warn("Error stopping workout");
    }
  };

  const handleClose = () => {
    if (isWorkoutRunning) {
      handleWorkoutStopApi();
    }
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Animated.View style={[styles.content, { opacity: screenFadeIn }]}>
          {/* Close button */}
          <View style={styles.topControls}>
            <TouchableOpacity
              style={[styles.controlButton, styles.closeButton]}
              activeOpacity={0.7}
              onPress={handleClose}
            >
              <Text
                style={[styles.controlIcon, { color: theme.colors.onSurface }]}
              >
                ✕
              </Text>
            </TouchableOpacity>
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
                    backgroundColor: isPreparationRunning
                      ? "#ff6b35"
                      : "#06407a",
                    width: isPreparationRunning
                      ? `${((10 - preparationTimer) / 10) * 100}%`
                      : progressBarAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0%", "100%"],
                        }),
                  },
                ]}
              />
            </View>
          </View>

          {/* Exercise display */}
          <RenderExercise
            exerciseData={exerciseData}
            scaleAnim={scaleAnimation}
            progressAnim={progressBarAnimation}
            timer={Math.max(
              isPreparationRunning ? preparationTimer : workoutTimer,
              0
            )}
            isPreparationRunning={isPreparationRunning}
          />

          {isWorkoutRunning && !isPreparationRunning && (
            <TouchableOpacity
              style={styles.pauseButton}
              onPress={() => setIsPaused((prev) => !prev)}
            >
               {isPaused ? (
                <Play size={30} color="#fff" fill="#fff" />
              ) : (
                <Pause size={30} color="#fff" fill="#fff" />
              )}
            </TouchableOpacity>
          )}

          {/* Stop button */}
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Main component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  topControls: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  controlButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    elevation: 4,
    borderRadius: "50%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  closeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  controlIcon: {
    fontSize: 20,
    fontWeight: "700",
  },
  progressBar: {
    flex: 1,
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
  pauseButton: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#06407a",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  pauseButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

// RenderExercise component styles
const renderExerciseStyles = StyleSheet.create({
  contentContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  imageContainer: {
    width: 300,
    height: 280,
    marginBottom: 30,
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  exerciseImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
    backgroundColor: "rgba(6, 64, 122, 0.1)",
  },
  readyContainer: {
    marginBottom: 24,
  },
  readyBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#06407a",
    elevation: 4,
    shadowColor: "#06407a",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  readyText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 1.2,
    textAlign: "center",
  },
  exerciseNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center",
    flex: 1,
  },
  infoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  infoIcon: {
    fontSize: 16,
    fontWeight: "700",
  },
  timerContainer: {
    alignItems: "center",
  },
  timerWrapper: {
    elevation: 12,
    shadowColor: "#06407a",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  circularTimer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#ffffff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  progressRing: {
    position: "absolute",
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 4,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#06407a",
  },
  timerInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 36,
  },
  timerLabel: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: -2,
  },
});

