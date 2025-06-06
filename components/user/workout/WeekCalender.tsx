import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { window } from "../../../constants/sizes";
import { Subcategory } from "../../../types/user/exercise/Subcategory";



interface WeekCalenderProps {
  setSelectedSubcategory: (id: string) => void;
  selectedSubcategory: string;
  subcategories: Subcategory[];
}

const WeekCalender: React.FC<WeekCalenderProps> = ({
  setSelectedSubcategory,
  selectedSubcategory,
  subcategories
}) => {
  const theme = useTheme();

  const handleSubcategoryPress = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  return (
    <View style={styles.weekContainer}>
      {subcategories.map((subcategory) => (
        <TouchableOpacity
          key={subcategory._id}
          style={styles.dayContainer}
          onPress={() => handleSubcategoryPress(subcategory._id)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.dayText,
              {
                color:
                  selectedSubcategory === subcategory._id ? "#06407a" : theme.colors.onSurface,
              },
            ]}
          >
            {subcategory.dayNumber}
          </Text>
          <View
            style={[
              styles.dateContainer,
              {
                backgroundColor:
                  selectedSubcategory === subcategory._id
                    ? "#06407a"
                    : theme.colors.surfaceVariant,
                borderWidth: selectedSubcategory === subcategory._id ? 0 : 1,
                borderColor: theme.colors.outline,
              },
            ]}
          >
            <Text
              style={[
                styles.dateText,
                {
                  color:
                         selectedSubcategory === subcategory._id
                      ? theme.colors.background
                      : theme.colors.onSurface,
                  fontWeight:      selectedSubcategory === subcategory._id ? "bold" : "600",
                },
              ]}
            >
              {subcategory.dayNumber}
            </Text>
          </View>
          {/* {day.isActive && (
            <View style={[styles.activeDot, { backgroundColor: "#06407a" }]} />
          )} */}
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
    paddingVertical: 20,
    marginHorizontal: 8,
    marginBottom: 4,
  },
  dayContainer: {
    alignItems: "center",
    width: window.width / 10, 
  },
  dayText: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  dateContainer: {
    width: window.width / 10,
    height: window.width / 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "700",
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
});
