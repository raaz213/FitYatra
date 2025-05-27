"use client"

import { useState, useEffect, useRef } from "react"
import { View, StyleSheet, Image, TouchableOpacity, Animated } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

interface Exercise {
  id: string
  name: string
  image: string
  reps: number
  instruction: string
  totalExercises: number
  currentExercise: number
}

const exerciseData: Exercise = {
  id: "1",
  name: "MOUNTAIN CLIMBER",
  image: "https://cdnb.artstation.com/p/assets/images/images/037/461/437/original/digital-artist-leg-pull-in.gif?1620422767",
  reps: 12,
  instruction: "Each Side x 6",
  totalExercises: 15,
  currentExercise: 1,
}

type WorkoutState = "ready" | "countdown" | "exercise" | "rest"

export default function WorkoutSScreen() {
  const theme = useTheme()
  const [workoutState, setWorkoutState] = useState<WorkoutState>("ready")
  const [readyTimer, setReadyTimer] = useState(15)
  const [exerciseTimer, setExerciseTimer] = useState(30)
  const [currentRep, setCurrentRep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(true)

  const scaleAnim = useRef(new Animated.Value(1)).current
  const progressAnim = useRef(new Animated.Value(0)).current

  // Ready timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (workoutState === "ready" && readyTimer > 0 && !isPaused) {
      interval = setInterval(() => {
        setReadyTimer((prev) => {
          if (prev <= 1) {
            setWorkoutState("exercise")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [workoutState, readyTimer, isPaused])

  // Exercise timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (workoutState === "exercise" && exerciseTimer > 0 && !isPaused) {
      interval = setInterval(() => {
        setExerciseTimer((prev) => {
          if (prev <= 1) {
            handleExerciseComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [workoutState, exerciseTimer, isPaused])

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
        ]),
      ).start()
    } else {
      scaleAnim.setValue(1)
    }
  }, [workoutState])

  // Progress animation
  useEffect(() => {
    const progress = workoutState === "ready" ? (15 - readyTimer) / 15 : (30 - exerciseTimer) / 30

    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [readyTimer, exerciseTimer, workoutState])

  const handleExerciseComplete = () => {
    setCurrentRep(currentRep + 1)
    if (currentRep + 1 >= exerciseData.reps) {
      // Exercise completed
      console.log("Exercise completed!")
    } else {
      // Reset for next rep
      setExerciseTimer(30)
    }
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const handleNext = () => {
    if (workoutState === "ready") {
      setWorkoutState("exercise")
      setReadyTimer(0)
    } else {
      handleExerciseComplete()
    }
  }

  const handlePrevious = () => {
    console.log("Previous exercise")
  }

  const handleSkip = () => {
    console.log("Skip exercise")
  }

  const handleClose = () => {
    console.log("Close workout")
  }

  const handleRestart = () => {
    setWorkoutState("ready")
    setReadyTimer(15)
    setExerciseTimer(30)
    setCurrentRep(0)
    setIsPaused(false)
  }

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn)
  }

  const renderReadyState = () => (
    <View style={styles.contentContainer}>
      <Animated.View style={[styles.imageContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={{ uri: exerciseData.image }} style={styles.exerciseImage} resizeMode="contain" />
      </Animated.View>

      <Text style={[styles.readyText, { color: '#06407a' }]}>READY TO GO!</Text>
      <View style={styles.exerciseNameContainer}>
        <Text style={[styles.exerciseName, { color: theme.colors.onSurface }]}>{exerciseData.name}</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={[styles.infoIcon, { color: theme.colors.onSurfaceVariant }]}>?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timerContainer}>
        <View style={[styles.circularTimer, { borderColor: '#06407a' }]}>
          <Animated.View
            style={[
              styles.progressRing,
              {
                borderColor: '#06407a',
                transform: [
                  {
                    rotate: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          />
          <Text style={[styles.timerText, { color: theme.colors.onSurface }]}>{readyTimer}</Text>
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={[styles.nextIcon, { color: theme.colors.onSurfaceVariant }]}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderExerciseState = () => (
    <View style={styles.contentContainer}>
      <Animated.View style={styles.imageContainer}>
        <Image source={{ uri: exerciseData.image }} style={styles.exerciseImage} resizeMode="contain" />
      </Animated.View>

      <View style={styles.exerciseNameContainer}>
        <Text style={[styles.exerciseName, { color: theme.colors.onSurface }]}>{exerciseData.name}</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={[styles.infoIcon, { color: theme.colors.onSurfaceVariant }]}>?</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.instruction, { color: theme.colors.onSurfaceVariant }]}>{exerciseData.instruction}</Text>

      <Text style={[styles.repCounter, { color: theme.colors.onSurface }]}>×{exerciseData.reps}</Text>

      <TouchableOpacity
        style={[styles.doneButton, { backgroundColor: '#06407a' }]}
        onPress={handleExerciseComplete}
      >
        <Text style={[styles.doneButtonText, { color: theme.colors.background }]}>✓ DONE</Text>
      </TouchableOpacity>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
          <Text style={[styles.navButtonText, { color: theme.colors.onSurfaceVariant }]}>◀ Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleSkip}>
          <Text style={[styles.navButtonText, { color: theme.colors.onSurfaceVariant }]}>Skip ▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.controlButton} onPress={handleClose}>
            <Text style={[styles.controlIcon, { color: theme.colors.onSurfaceVariant }]}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={handleRestart}>
            <Text style={[styles.controlIcon, { color: theme.colors.onSurfaceVariant }]}>↻</Text>
          </TouchableOpacity>
        </View>

        {/* Side Controls */}
        <View style={styles.leftControls}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleSound}>
            <Text style={[styles.controlIcon, { color: theme.colors.onSurfaceVariant }]}>
              {isSoundOn ? "🔊" : "🔇"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rightControls}>
          <TouchableOpacity style={styles.controlButton} onPress={handlePause}>
            <Text style={[styles.controlIcon, { color: theme.colors.onSurfaceVariant }]}>{isPaused ? "▶" : "⏸"}</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressBar, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                backgroundColor: '#06407a',
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>

        {/* Main Content */}
        {workoutState === "ready" ? renderReadyState() : renderExerciseState()}
      </SafeAreaView>
    </SafeAreaProvider>
  )
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
  leftControls: {
    position: "absolute",
    left: 20,
    top: "50%",
    zIndex: 10,
  },
  rightControls: {
    position: "absolute",
    right: 20,
    top: "50%",
    zIndex: 10,
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  imageContainer: {
    width: 280,
    height: 200,
    marginBottom: 40,
  },
  exerciseImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  readyText: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
    letterSpacing: 1,
  },
  exerciseNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  infoButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  infoIcon: {
    fontSize: 14,
    fontWeight: "600",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  circularTimer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  progressRing: {
    position: "absolute",
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },
  timerText: {
    fontSize: 28,
    fontWeight: "800",
  },
  nextButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  nextIcon: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 2,
  },
  instruction: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
  repCounter: {
    fontSize: 48,
    fontWeight: "800",
    marginBottom: 40,
  },
  doneButton: {
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 40,
    elevation: 4,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
})
