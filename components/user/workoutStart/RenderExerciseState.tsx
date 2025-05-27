import { Text, TouchableOpacity } from "react-native";
import { Animated, Image, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

interface RenderExerciseStateProps {
  exerciseData: {
    name: string;
    image: string;
    instruction: string;
    reps: number;
    sets: number;
  };
  handleExerciseComplete: () => void;
}

const RenderExerciseState: React.FC<RenderExerciseStateProps> = ({
  exerciseData,
  handleExerciseComplete,
}) => {
  const theme = useTheme();

  const handlePrevious = () => {
    console.log("Previous exercise");
  };

  const handleSkip = () => {
    console.log("Skip exercise");
  };

  return (
    <View style={styles.contentContainer}>
      <Animated.View style={styles.imageContainer}>
        <Image
          source={{ uri: exerciseData.image }}
          style={styles.exerciseImage}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={styles.exerciseNameContainer}>
        <Text style={[styles.exerciseName, { color: theme.colors.onSurface }]}>
          {exerciseData.name}
        </Text>
        <TouchableOpacity style={styles.infoButton}>
          <Text
            style={[styles.infoIcon, { color: theme.colors.onSurfaceVariant }]}
          >
            ?
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={[styles.instruction, { color: theme.colors.onSurfaceVariant }]}
      >
        {exerciseData.instruction}
      </Text>

      <Text style={[styles.repCounter, { color: theme.colors.onSurface }]}>
        ×{exerciseData.reps}
      </Text>

      <TouchableOpacity
        style={[styles.doneButton, { backgroundColor: "#06407a" }]}
        onPress={handleExerciseComplete}
      >
        <Text
          style={[styles.doneButtonText, { color: theme.colors.background }]}
        >
          ✓ DONE
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
          <Text
            style={[
              styles.navButtonText,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            ◀ Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleSkip}>
          <Text
            style={[
              styles.navButtonText,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            Skip ▶
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RenderExerciseState;

const styles = StyleSheet.create({
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
});
