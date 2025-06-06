import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, useTheme } from "react-native-paper";
import { Exercise } from "../../../types/user/exercise/Exercise";

interface IllustrationAndFocusAreaProps {
  exerciseData: Exercise;
}

const InstructionAndFocusArea: React.FC<IllustrationAndFocusAreaProps> = ({
  exerciseData,
}) => {
  const theme = useTheme();
  return (
    <View style={styles.instructionsContent}>
      <Card
        style={[
          styles.instructionsCard,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Card.Content style={styles.instructionsCardContent}>
          <Text style={[styles.instructionsTitle, { color: "#06407a" }]}>
            INSTRUCTIONS
          </Text>

          <Text
            style={[styles.instructionText, { color: theme.colors.onSurface }]}
          >
            {exerciseData.instructions}
          </Text>
        </Card.Content>
      </Card>

      <Card
        style={[styles.focusCard, { backgroundColor: theme.colors.surface }]}
      >
        <Card.Content style={styles.focusContent}>
          <Text style={[styles.focusTitle, { color: "#06407a" }]}>
            FOCUS AREA
          </Text>
          <View style={styles.focusAreas}>
            <View style={[styles.focusTag, { backgroundColor: "#06407a" }]}>
              <Text
                style={[
                  styles.focusTagText,
                  { color: theme.colors.background },
                ]}
              >
                {exerciseData.focusArea}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default InstructionAndFocusArea;

const styles = StyleSheet.create({
  instructionsContent: { gap: 20, marginBottom: 20 },
  instructionsCard: { borderRadius: 16, elevation: 3 },
  instructionsCardContent: { paddingVertical: 20 },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 16,
  },
  instructionText: { fontSize: 15, lineHeight: 22, marginBottom: 12 },
  focusCard: { borderRadius: 16, elevation: 3 },
  focusContent: { paddingVertical: 20 },
  focusTitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 16,
  },
  focusAreas: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  focusTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
  },
  focusTagText: { fontSize: 14, fontWeight: "600", letterSpacing: 0.3 },
});
