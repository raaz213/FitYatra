"use client"

import { useState } from "react"
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Appbar, Text, Card, Button, useTheme } from "react-native-paper"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

interface Exercise {
  id: string
  name: string
  sets: string
  image: string
}

interface DaySchedule {
  day: string
  date: number
  isActive?: boolean
}

interface WorkoutDay {
  id: number
  title: string
  subtitle: string
  category: string
  exercises: Exercise[]
}

const workoutData: WorkoutDay[] = [
  {
    id: 1,
    title: "CHEST & TRICEPS",
    subtitle: "DAY 1 - PUSH WORKOUT",
    category: "Chest, Triceps",
    exercises: [
      {
        id: "1",
        name: "BARBELL BENCH PRESS",
        sets: "4 SETS • 12,10,8,6 REPS",
        image: "https://media.istockphoto.com/id/2053695371/photo/focused-woman-exercising-with-kettlebell-in-a-gym-setting.webp?a=1&b=1&s=612x612&w=0&k=20&c=C0UlmSEOi9oe-pu8OXNCxEplC-AHxxkrhbOrVg5vMvE=",
      },
      {
        id: "2",
        name: "INCLINE DUMBBELL PRESS",
        sets: "4 SETS • 10,8,8,6 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "3",
        name: "CHEST DIPS",
        sets: "3 SETS • 12,10,8 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "4",
        name: "TRICEP PUSHDOWNS",
        sets: "4 SETS • 12 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "5",
        name: "OVERHEAD TRICEP EXTENSION",
        sets: "3 SETS • 10,8,8 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    id: 2,
    title: "BACK & BICEPS",
    subtitle: "DAY 2 - PULL WORKOUT",
    category: "Back, Biceps",
    exercises: [
      {
        id: "1",
        name: "DEADLIFTS",
        sets: "4 SETS • 8,6,6,4 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "2",
        name: "PULL-UPS",
        sets: "4 SETS • 10,8,6,6 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "3",
        name: "BARBELL ROWS",
        sets: "4 SETS • 12,10,8,8 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "4",
        name: "HAMMER CURLS",
        sets: "4 SETS • 12 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "5",
        name: "CABLE BICEP CURLS",
        sets: "3 SETS • 15,12,10 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    id: 3,
    title: "LEGS & GLUTES",
    subtitle: "DAY 3 - LEG WORKOUT",
    category: "Quadriceps, Hamstrings, Glutes",
    exercises: [
      {
        id: "1",
        name: "SQUATS",
        sets: "4 SETS • 12,10,8,6 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "2",
        name: "ROMANIAN DEADLIFTS",
        sets: "4 SETS • 10,8,8,6 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "3",
        name: "LEG PRESS",
        sets: "4 SETS • 15,12,10,8 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "4",
        name: "WALKING LUNGES",
        sets: "3 SETS • 12 EACH LEG",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "5",
        name: "CALF RAISES",
        sets: "4 SETS • 20,15,15,12 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    id: 4,
    title: "SHOULDERS & ABS",
    subtitle: "DAY 4 - SHOULDERS & CORE",
    category: "Shoulders, Core",
    exercises: [
      {
        id: "1",
        name: "OVERHEAD PRESS",
        sets: "4 SETS • 12,10,8,6 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "2",
        name: "LATERAL RAISES",
        sets: "4 SETS • 15,12,10,8 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "3",
        name: "REAR DELT FLYES",
        sets: "3 SETS • 12,10,8 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "4",
        name: "PLANK",
        sets: "3 SETS • 60,45,30 SECONDS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "5",
        name: "RUSSIAN TWISTS",
        sets: "3 SETS • 20,15,15 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    id: 5,
    title: "ARMS FOCUS",
    subtitle: "DAY 5 - BICEPS & TRICEPS",
    category: "Biceps, Triceps",
    exercises: [
      {
        id: "1",
        name: "STANDING BARBELL CURL",
        sets: "4 SETS • 12,10,8,6 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "2",
        name: "REVERSE CABLE CURL",
        sets: "4 SETS • 10,8,8,6 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "3",
        name: "INCLINE DUMBBELL CURL",
        sets: "4 SETS • 12,10,8,8 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "4",
        name: "CLOSE GRIP BENCH PRESS",
        sets: "4 SETS • 12 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "5",
        name: "DIAMOND PUSH-UPS",
        sets: "3 SETS • 15,12,10 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    id: 6,
    title: "FULL BODY",
    subtitle: "DAY 6 - FULL BODY WORKOUT",
    category: "Full Body Circuit",
    exercises: [
      {
        id: "1",
        name: "BURPEES",
        sets: "3 SETS • 10,8,6 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "2",
        name: "MOUNTAIN CLIMBERS",
        sets: "3 SETS • 30 SECONDS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "3",
        name: "KETTLEBELL SWINGS",
        sets: "4 SETS • 20,15,15,10 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "4",
        name: "PUSH-UP TO T",
        sets: "3 SETS • 12 REPS",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "5",
        name: "JUMPING JACKS",
        sets: "3 SETS • 45 SECONDS",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    id: 7,
    title: "ACTIVE RECOVERY",
    subtitle: "DAY 7 - REST & RECOVERY",
    category: "Stretching, Mobility",
    exercises: [
      {
        id: "1",
        name: "LIGHT WALKING",
        sets: "20-30 MINUTES",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "2",
        name: "DYNAMIC STRETCHING",
        sets: "10 MINUTES",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "3",
        name: "FOAM ROLLING",
        sets: "15 MINUTES",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "4",
        name: "YOGA FLOW",
        sets: "20 MINUTES",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "5",
        name: "MEDITATION",
        sets: "10 MINUTES",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
]

const weekDays: DaySchedule[] = [
  { day: "Day 1", date: 1, isActive: true },
  { day: "Day 2", date: 2, isActive: true },
  { day: "Day 3", date: 3, isActive: true },
  { day: "Day 4", date: 4, isActive: true },
  { day: "Day 5", date: 5, isActive: true },
  { day: "Day 6", date: 6, isActive: true },
  { day: "Day 7", date: 7, isActive: true },
]

export default function WorkoutScreen({navigation}: {navigation: any}) {
  const theme = useTheme()
  const [selectedDay, setSelectedDay] = useState(5) // Default to Day 5 (Arms Focus)

  const currentWorkout = workoutData.find((workout) => workout.id === selectedDay) || workoutData[4]

  const handleDayPress = (dayNumber: number) => {
    setSelectedDay(dayNumber)
  }
  const handleWorkoutDayPress = (dayId: number) => {
    navigation.navigate("WorkoutDetails", { dayId })
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content
            title="WORKOUT PLAN"
            subtitle={currentWorkout.subtitle}
            titleStyle={styles.headerTitle}
            subtitleStyle={styles.headerSubtitle}
          />
          <Appbar.Action icon="refresh" onPress={() => {}} />
        </Appbar.Header>

        <ScrollView style={styles.content}>
          {/* Week Calendar */}
          <View style={styles.weekContainer}>
            {weekDays.map((day) => (
              <TouchableOpacity
                key={day.day}
                style={styles.dayContainer}
                onPress={() => handleDayPress(day.date)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dayText,
                    { color: selectedDay === day.date ? theme.colors.primary : theme.colors.onSurface },
                  ]}
                >
                  {day.day}
                </Text>
                <View
                  style={[
                    styles.dateContainer,
                    {
                      backgroundColor: selectedDay === day.date ? theme.colors.primary : theme.colors.surfaceVariant,
                      borderWidth: selectedDay === day.date ? 0 : 1,
                      borderColor: theme.colors.outline,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dateText,
                      {
                        color: selectedDay === day.date ? theme.colors.background : theme.colors.onSurface,
                        fontWeight: selectedDay === day.date ? "bold" : "600",
                      },
                    ]}
                  >
                    {day.date}
                  </Text>
                </View>
                {day.isActive && <View style={[styles.activeDot, { backgroundColor: theme.colors.primary }]} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* Workout Category */}
          <Card style={[styles.categoryCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.categoryContent}>
              <View style={styles.categoryInfo}>
                <View>
                  <Text style={[styles.categoryTitle, { color: theme.colors.onSurface }]}>{currentWorkout.title}</Text>
                  <Text style={[styles.categorySubtitle, { color: theme.colors.onSurfaceVariant }]}>
                    {currentWorkout.category}
                  </Text>
                </View>
                <Button
                  mode="contained"
                  compact
                  style={[styles.descriptionButton, { backgroundColor: theme.colors.primary }]}
                  labelStyle={{ color: theme.colors.background, fontSize: 12 }}
                >
                  Description
                </Button>
              </View>
            </Card.Content>
          </Card>

          {/* Exercise List */}
          <View style={styles.exerciseList}>
            {currentWorkout.exercises.map((exercise, index) => (
              <Card key={exercise.id} style={[styles.exerciseCard, { backgroundColor: theme.colors.surface }]}>
                <TouchableOpacity
                  onPress={() => handleWorkoutDayPress(1)}
                  activeOpacity={0.7}
                  style={{ flex: 1 }}>
                <Card.Content style={styles.exerciseContent}>
                  <View style={[styles.exerciseNumber, { backgroundColor: theme.colors.primary }]}>
                    <Text style={[styles.numberText, { color: theme.colors.background }]}>
                      {String(index + 1).padStart(2, "0")}
                    </Text>
                  </View>

                  <View style={styles.exerciseInfo}>
                    <Text style={[styles.exerciseName, { color: theme.colors.onSurface }]}>{exercise.name}</Text>
                    <Text style={[styles.exerciseSets, { color: theme.colors.onSurfaceVariant }]}>{exercise.sets}</Text>
                  </View>

                  <Image
                    source={{ uri: exercise.image }}
                    style={[styles.exerciseImage, { borderColor: theme.colors.outline }]}
                    resizeMode="cover"
                  />
                </Card.Content>
                </TouchableOpacity>
              </Card>
            ))}
          </View>

          {/* Workout Summary */}
          <Card style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.summaryContent}>
              <Text style={[styles.summaryTitle, { color: theme.colors.onSurface }]}>Workout Summary</Text>
              <View style={styles.summaryStats}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                    {currentWorkout.exercises.length}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>Exercises</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: theme.colors.primary }]}>45-60</Text>
                  <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>Minutes</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                    {selectedDay === 7 ? "Low" : selectedDay === 6 ? "High" : "Medium"}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>Intensity</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.8,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  dayContainer: {
    alignItems: "center",
    minWidth: 44,
  },
  dayText: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  dateContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateText: {
    fontSize: 15,
    fontWeight: "700",
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  categoryCard: {
    marginBottom: 24,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  categoryContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  categoryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.8,
  },
  descriptionButton: {
    borderRadius: 24,
    paddingHorizontal: 8,
    elevation: 2,
  },
  exerciseList: {
    gap: 16,
    paddingBottom: 24,
  },
  exerciseCard: {
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  exerciseContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  exerciseNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    elevation: 2,
  },
  numberText: {
    fontSize: 16,
    fontWeight: "800",
  },
  exerciseInfo: {
    flex: 1,
    marginRight: 16,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  exerciseSets: {
    fontSize: 13,
    fontWeight: "500",
    opacity: 0.8,
    letterSpacing: 0.2,
  },
  exerciseImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#2D2D2D",
    borderWidth: 1,
  },
  summaryCard: {
    marginBottom: 32,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  summaryContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
})
