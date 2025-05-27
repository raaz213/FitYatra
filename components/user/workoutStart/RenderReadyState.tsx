import { Text, TouchableOpacity } from "react-native";
import { Animated, Image, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

interface RenderReadyStateProps {
  exerciseData: {
    name: string;
    image: string;
  };
  scaleAnim: any,
  progressAnim: any,
  handleNext: () => void,
  readyTimer: number,
}

const RenderReadyState: React.FC<RenderReadyStateProps> = ({
  exerciseData, scaleAnim, progressAnim, handleNext, readyTimer
}) => {
  const theme = useTheme();

  return (
    <View style={styles.contentContainer}>
      <Animated.View
        style={[styles.imageContainer, { transform: [{ scale: scaleAnim }] }]}
      >
        <Image
          source={{ uri: exerciseData.image }}
          style={styles.exerciseImage}
          resizeMode="contain"
        />
      </Animated.View>

      <Text style={[styles.readyText, { color: "#06407a" }]}>READY TO GO!</Text>
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

      <View style={styles.timerContainer}>
        <View style={[styles.circularTimer, { borderColor: "#06407a" }]}>
          <Animated.View
            style={[
              styles.progressRing,
              {
                borderColor: "#06407a",
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
          <Text style={[styles.timerText, { color: theme.colors.onSurface }]}>
            {readyTimer}
          </Text>
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text
            style={[styles.nextIcon, { color: theme.colors.onSurfaceVariant }]}
          >
            ▶
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RenderReadyState;

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
});
