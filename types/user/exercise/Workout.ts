import { User } from "../../auth/auth";
import { Exercise } from "./Exercise";

export interface Workout {
  _id: string;
  user: User;
  exercise: Exercise;
  startTime: Date;
  duration: number;
  caloriesBurned: number;
  endTime?: Date;
}
interface DailyCalorieEntry {
  totalDailyCalories: number;
  date: string;
}

export interface CardWorkoutStats {
  totalCalories: number;
  totalWorkouts: number;
  totalHoursTrained: number;
  streakDays: number;
}

interface AverageWeekCalories {
  averageWeekCalories: number;
  week: string;
}

export interface CalorieData {
  dailyCalories: DailyCalorieEntry[];
  averageWeekCalories: AverageWeekCalories;
  cardWorkoutStats: CardWorkoutStats;
}

export interface TotalUserCalories {
  totalDailyCalories: number;
  date : string;
}
AdminCardStats
export interface  {
  totalExercise: number;
  totalUser: number;
  totalNutrition: number;
  engagementRate: string;
}