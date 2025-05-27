import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface DaySchedule {
  day: string;
  date: number;
  isActive?: boolean;
}

const weekDays: DaySchedule[] = [
  { day: "Day 1", date: 1, isActive: true },
  { day: "Day 2", date: 2, isActive: true },
  { day: "Day 3", date: 3, isActive: true },
  { day: "Day 4", date: 4, isActive: true },
  { day: "Day 5", date: 5, isActive: true },
  { day: "Day 6", date: 6, isActive: true },
  { day: "Day 7", date: 7, isActive: true },
];

interface WeekCalenderProps {
  setSelectedDay: (dayNumber: number) => void;
  selectedDay: number;
}

const WeekCalender: React.FC<WeekCalenderProps> = ({
  setSelectedDay,
  selectedDay,
}) => {
  const theme = useTheme();

  const handleDayPress = (dayNumber: number) => {
    setSelectedDay(dayNumber);
  };

  return (
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
              {
                color:
                  selectedDay === day.date ? "#06407a" : theme.colors.onSurface,
              },
            ]}
          >
            {day.day}
          </Text>
          <View
            style={[
              styles.dateContainer,
              {
                backgroundColor:
                  selectedDay === day.date
                    ? "#06407a"
                    : theme.colors.surfaceVariant,
                borderWidth: selectedDay === day.date ? 0 : 1,
                borderColor: theme.colors.outline,
              },
            ]}
          >
            <Text
              style={[
                styles.dateText,
                {
                  color:
                    selectedDay === day.date
                      ? theme.colors.background
                      : theme.colors.onSurface,
                  fontWeight: selectedDay === day.date ? "bold" : "600",
                },
              ]}
            >
              {day.date}
            </Text>
          </View>
          {day.isActive && (
            <View style={[styles.activeDot, { backgroundColor: "#06407a" }]} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default WeekCalender;

const styles = StyleSheet.create({
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
});
