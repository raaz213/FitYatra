import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WeekCalender from "../../../components/user/workout/WeekCalender";
import AppbarHeader from "../../../components/user/workout/AppbarHeader";
import WorkoutCategory from "../../../components/user/workout/WorkoutCategory";
import ExerciseList from "../../../components/user/workout/ExerciseList";
import WorkoutSummary from "../../../components/user/workout/WorkoutSummary";

export interface Exercise {
  id: string;
  name: string;
  sets: string;
  image: string;
}

interface WorkoutDay {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  exercises: Exercise[];
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
        image:
          "https://media.istockphoto.com/id/2053695371/photo/focused-woman-exercising-with-kettlebell-in-a-gym-setting.webp?a=1&b=1&s=612x612&w=0&k=20&c=C0UlmSEOi9oe-pu8OXNCxEplC-AHxxkrhbOrVg5vMvE=",
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
];

export default function WorkoutScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const [selectedDay, setSelectedDay] = useState(5);

  const currentWorkout =
    workoutData.find((workout) => workout.id === selectedDay) || workoutData[4];

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <AppbarHeader currentWorkout={currentWorkout} />

        <ScrollView style={styles.content}>
          {/* Week Calendar */}
          <WeekCalender
            setSelectedDay={setSelectedDay}
            selectedDay={selectedDay}
          />

          {/* Workout Category */}
          <WorkoutCategory currentWorkout={currentWorkout} />

          {/* Exercise List */}
          <ExerciseList
            currentWorkout={currentWorkout}
            navigation={navigation}
          />

          {/* Workout Summary */}
          <WorkoutSummary
            currentWorkout={currentWorkout}
            selectedDay={selectedDay}
          />
        </ScrollView>
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
    paddingHorizontal: 20,
  },
});
