import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { Card, useTheme, Button } from "react-native-paper";
import { Exercise } from "../../../types/user/exercise/Exercise";
import { Subcategory } from "../../../types/user/exercise/Subcategory";

interface CurrentSubcategoryType {
  currentSubcategory: Subcategory | undefined;
};

const WorkoutCategory: React.FC<CurrentSubcategoryType> = ({ currentSubcategory }) => {

  const theme = useTheme();

  return (
    <Card
      style={[
        styles.categoryCard,
        {
          backgroundColor: theme.colors.surface,
        },
      ]}
    >
      <Card.Content style={styles.categoryContent}>
        <View style={styles.categoryInfo}>
          <View style={styles.textContainer}>
            <Text
              style={[styles.categoryTitle, { color: theme.colors.onSurface }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {currentSubcategory?.name}
            </Text>
            <Text
              style={[
                styles.categorySubtitle,
                { color: theme.colors.onSurfaceVariant },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {currentSubcategory?.description}
            </Text>
          </View>
          <Button
            mode="contained"
            compact
            style={[styles.descriptionButton, { backgroundColor: "#06407a" }]}
            labelStyle={{ color: theme.colors.background, fontSize: 12 }}
          >
            Description
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default WorkoutCategory;

const styles = StyleSheet.create({
  categoryCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  categoryContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  categoryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.8,
  },
  descriptionButton: {
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginTop: 6,
  },
});
