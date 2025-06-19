import { Text, TouchableOpacity } from "react-native";
import { Animated, Image, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { API_URL } from "../../../constants/apiUrl";

interface RenderExerciseProps {
  exerciseData: {
    name: string;
    image: string;
  };
  scaleAnim: any,
  progressAnim: any,
  timer: number,
}

const RenderExercise: React.FC<RenderExerciseProps> = ({
  exerciseData, scaleAnim, progressAnim, timer
}) => {
  const theme = useTheme();

  return (
    <View style={styles.contentContainer}>
      <Animated.View
        style={[styles.imageContainer, { transform: [{ scale: scaleAnim }] }]}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: `${API_URL}/uploads/${exerciseData.image}`}}
            style={styles.exerciseImage}
            resizeMode="contain"
          />
          <View style={styles.imageOverlay} />
        </View>
      </Animated.View>

      <View style={styles.readyContainer}>
        <View style={styles.readyBadge}>
          <Text style={styles.readyText}>READY TO GO!</Text>
        </View>
      </View>

      <View style={styles.exerciseNameContainer}>
        <Text style={[styles.exerciseName, { color: theme.colors.onSurface }]}>
          {exerciseData.name}
        </Text>
        <TouchableOpacity style={[styles.infoButton, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Text
            style={[styles.infoIcon, { color: theme.colors.primary }]}
          >
            ?
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timerContainer}>
        <View style={styles.timerWrapper}>
          <View style={[styles.circularTimer, { borderColor: 'rgba(6, 64, 122, 0.2)' }]}>
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
            <View style={styles.timerInner}>
              <Text style={[styles.timerText, { color: theme.colors.onSurface }]}>
                {timer}
              </Text>
              <Text style={[styles.timerLabel, { color: theme.colors.onSurfaceVariant }]}>
                SEC
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RenderExercise;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  imageContainer: {
    width: 300,
    height: 220,
    marginBottom: 30,
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  exerciseImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'rgba(6, 64, 122, 0.1)',
  },
  readyContainer: {
    marginBottom: 24,
  },
  readyBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#06407a',
    elevation: 4,
    shadowColor: '#06407a',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  readyText: {
    fontSize: 16,
    fontWeight: "800",
    color: '#ffffff',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  exerciseNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: 'center',
    flex: 1,
  },
  infoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  infoIcon: {
    fontSize: 16,
    fontWeight: "700",
  },
  timerContainer: {
    alignItems: "center",
  },
  timerWrapper: {
    elevation: 12,
    shadowColor: '#06407a',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  circularTimer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: '#ffffff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  progressRing: {
    position: "absolute",
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 4,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#06407a",
  },
  timerInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 36,
  },
  timerLabel: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: -2,
  },
});