"use client"

import React, { useState, useEffect, useRef, useContext } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  AppState,
  type AppStateStatus,
  Text as RNText,
  Image,
} from "react-native"
import { Text, useTheme } from "react-native-paper"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { WorkoutContext } from "../../../context/WorkoutContext"
import { startWorkout, stopWorkout } from "../../../services/user/exercise/Exercise"
import { useFocusEffect } from "@react-navigation/native"
import { API_URL } from "../../../constants/apiUrl"

// RenderExercise component integrated inline
interface RenderExerciseProps {
  exerciseData: {
    name: string
    image: string
  }
  scaleAnim: any
  progressAnim: any
  timer: number
  isReady: boolean
}

const RenderExercise: React.FC<RenderExerciseProps> = ({ exerciseData, scaleAnim, progressAnim, timer, isReady }) => {
  const theme = useTheme()

  return (
    <View style={renderExerciseStyles.contentContainer}>
      <Animated.View style={[renderExerciseStyles.imageContainer, { transform: [{ scale: scaleAnim }] }]}>
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
        <View style={[renderExerciseStyles.readyBadge, { backgroundColor: isReady ? "#ff6b35" : "#06407a" }]}>
          <RNText style={renderExerciseStyles.readyText}>{isReady ? "GET READY!" : "READY TO GO!"}</RNText>
        </View>
      </View>

      <View style={renderExerciseStyles.exerciseNameContainer}>
        <RNText style={[renderExerciseStyles.exerciseName, { color: theme.colors.onSurface }]}>
          {exerciseData.name}
        </RNText>
        <TouchableOpacity style={[renderExerciseStyles.infoButton, { backgroundColor: theme.colors.surfaceVariant }]}>
          <RNText style={[renderExerciseStyles.infoIcon, { color: theme.colors.primary }]}>?</RNText>
        </TouchableOpacity>
      </View>

      <View style={renderExerciseStyles.timerContainer}>
        <View style={renderExerciseStyles.timerWrapper}>
          <View
            style={[
              renderExerciseStyles.circularTimer,
              { borderColor: isReady ? "rgba(255, 107, 53, 0.2)" : "rgba(6, 64, 122, 0.2)" },
            ]}
          >
            <Animated.View
              style={[
                renderExerciseStyles.progressRing,
                {
                  borderColor: isReady ? "#ff6b35" : "#06407a",
                  transform: [
                    {
                      rotate: isReady
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
              <RNText style={[renderExerciseStyles.timerText, { color: theme.colors.onSurface }]}>{timer}</RNText>
              <RNText style={[renderExerciseStyles.timerLabel, { color: theme.colors.onSurfaceVariant }]}>SEC</RNText>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default function WorkoutStartScreen({ navigation, route }: any) {
  const theme = useTheme()
  const { exerciseData } = route.params
  const [timer, setTimer] = useState(exerciseData.duration)
  const [isActive, setIsActive] = useState(true)
  const [readyTimer, setReadyTimer] = useState(15)
  const [isReady, setIsReady] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const totalDuration = exerciseData.duration

  const scaleAnim = useRef(new Animated.Value(1)).current
  const progressAnim = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  const { workoutId , setWorkoutId }: any = useContext(WorkoutContext)
  const currentWorkoutId = useRef<string | null>(null)

  const appState = useRef(AppState.currentState)
  const hasStopped = useRef(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isMounted = useRef(true)

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])
console.log(workoutId);
  useEffect(() => {
    // Save the latest workoutId in ref
    currentWorkoutId.current = workoutId
  }, [workoutId])

  useEffect(() => {
    return () => {
      isMounted.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isReady && readyTimer <= 0) {
      setIsReady(false)
      setIsActive(true)
      // Start progress animation for exercise timer
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: totalDuration * 1000,
        useNativeDriver: false,
      }).start()
    }

    if (timer <= 0 && !hasStopped.current && !isReady) {
      handleWorkoutStop(false)
    }

    if (isReady && readyTimer > 0 && !isPaused) {
      intervalRef.current = setInterval(() => {
        setReadyTimer((prev: number) => prev - 1)
      }, 1000)
    } else if (isActive && timer > 0 && !isPaused && !isReady) {
      intervalRef.current = setInterval(() => {
        setTimer((prev: number) => prev - 1)
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isActive, timer, readyTimer, isReady, isPaused, totalDuration])

useEffect(() => {
  const handleStartWorkout = async() => {
      const response  =  await startWorkout(exerciseData._id);
      setWorkoutId(response._id)
  }
  if(isActive && !isPaused && !isReady){
  handleStartWorkout();
  }
}, [isActive ,isPaused ,isReady]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current === "active" && (nextAppState === "inactive" || nextAppState === "background")) {
        if (!hasStopped.current) {
          handleWorkoutStop(false)
        }
      }
      appState.current = nextAppState
    }

    const subscription = AppState.addEventListener("change", handleAppStateChange)

    return () => {
      subscription.remove()
    }
  }, [])

  // Unified stop function
  const handleWorkoutStop = async (shouldNavigate: boolean) => {
    if (hasStopped.current) return

    hasStopped.current = true
    setIsActive(false)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    const idToStop = currentWorkoutId.current
    if (!idToStop) {
      console.warn("No valid workoutId to stop.")
      return
    }

    try {
      await stopWorkout(idToStop)
      if (shouldNavigate && isMounted.current) {
        navigation.goBack()
      }
    } catch (error) {
      console.log("Error stopping workout:", error)
    }
  }

  const handleClose = () => handleWorkoutStop(true)
  const handleStop = () => handleWorkoutStop(true)

  const handlePlayPause = () => {
    setIsPaused(!isPaused)
    if (isPaused) {
      // Resume progress animation if in exercise phase
      if (!isReady) {
        const remainingProgress = (totalDuration - timer) / totalDuration
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: timer * 1000,
          useNativeDriver: false,
        }).start()
      }
    } else {
      // Pause progress animation
      progressAnim.stopAnimation()
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (!hasStopped.current && isMounted.current) {
          handleWorkoutStop(false)
        }
      }
    }, []),
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.topControls}>
            <TouchableOpacity
              style={[styles.controlButton, styles.closeButton]}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={[styles.controlIcon, { color: theme.colors.onSurface }]}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: "rgba(6, 64, 122, 0.15)" }]}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: isReady ? "#ff6b35" : "#06407a",
                    width: isReady
                      ? `${((15 - readyTimer) / 15) * 100}%`
                      : progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0%", "100%"],
                        }),
                  },
                ]}
              />
            </View>
          </View>

          {/* Main Content - RenderExercise component integrated */}
          <RenderExercise
            exerciseData={exerciseData}
            scaleAnim={scaleAnim}
            progressAnim={progressAnim}
            timer={isReady ? readyTimer : timer}
            isReady={isReady}
          />

          <View style={styles.rightControls}>
            <TouchableOpacity
              style={[styles.controlButton, styles.playPauseButton]}
              onPress={handlePlayPause}
              activeOpacity={0.7}
            >
              <Text style={[styles.controlIcon, { color: "#ffffff" }]}>{isPaused ? "▶" : "⏸"}</Text>
            </TouchableOpacity>
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
  )
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
    flexDirection: "column",
    alignItems: "center",
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
  playPauseButton: {
    backgroundColor: "#2ecc71",
    marginBottom: 8,
  },
})

// RenderExercise component styles
const renderExerciseStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  imageContainer: {
    width: 300,
    height: 220,
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
})
