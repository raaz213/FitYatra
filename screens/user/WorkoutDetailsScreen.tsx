import { useState, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Appbar, Text, Card, Button, useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import WebView from "react-native-webview";

interface Exercise {
  id: string;
  name: string;
  gif: string;
  youtubeUrl: string;
  instructions: string[];
  focusArea: string[];
  totalExercises: number;
  currentExercise: number;
}

const exerciseData: Exercise = {
  id: "1",
  name: "ABDOMINAL CRUNCHES",
  gif: "https://gymvisual.com/img/p/1/6/8/8/2/16882.gif",
  youtubeUrl: "https://www.youtube.com/shorts/VZUDAOL2LI8",
  instructions: [
    "Lie on your back with your knees bent and your arms stretched forward.",
    "Then lift your upper body off the floor. Hold for a few seconds and slowly return.",
    "It primarily works the rectus abdominis muscle and the obliques.",
  ],
  focusArea: ["Abs"],
  totalExercises: 15,
  currentExercise: 1,
};

export default function WorkoutDetailsScreen({navigation}: any) {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState("Animation");

  const tabs = ["Animation", "How to do"];

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
  };
const handleWorkoutStartPress = () => {
    navigation.navigate('WorkoutStart'); // Replace "WorkoutScreen" with your screen name
}
  

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content
            title={exerciseData.name}
            titleStyle={styles.headerTitle}
          />
          <Button
            mode="text"
            compact
            style={styles.replaceButton}
            labelStyle={{
              color: theme.colors.primary,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Replace
          </Button>
        </Appbar.Header>

        <ScrollView style={styles.content}>
          <View style={styles.illustrationContainer}>
            {selectedTab === "Animation" ? (
              <Image
                source={{ uri: exerciseData.gif }}
                style={styles.exerciseImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.videoContainer}>
                <WebView
                  source={{ uri: exerciseData.youtubeUrl }}
                  style={styles.videoPlayer}
                  javaScriptEnabled
                  allowsFullscreenVideo
                />
              </View>
            )}
          </View>

          {/* Tab Navigation */}
          <View
            style={[
              styles.tabContainer,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  selectedTab === tab && {
                    backgroundColor: theme.colors.primary,
                  },
                ]}
                onPress={() => handleTabPress(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        selectedTab === tab
                          ? theme.colors.background
                          : theme.colors.onSurfaceVariant,
                      fontWeight: selectedTab === tab ? "700" : "500",
                    },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Instructions + FocusArea (for both tabs) */}
          <View style={styles.instructionsContent}>
            <Card
              style={[
                styles.instructionsCard,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <Card.Content style={styles.instructionsCardContent}>
                <Text
                  style={[
                    styles.instructionsTitle,
                    { color: theme.colors.primary },
                  ]}
                >
                  INSTRUCTIONS
                </Text>
                {exerciseData.instructions.map((instruction, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.instructionText,
                      { color: theme.colors.onSurface },
                    ]}
                  >
                    {instruction}
                  </Text>
                ))}
              </Card.Content>
            </Card>

            <Card
              style={[
                styles.focusCard,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <Card.Content style={styles.focusContent}>
                <Text
                  style={[styles.focusTitle, { color: theme.colors.primary }]}
                >
                  FOCUS AREA
                </Text>
                <View style={styles.focusAreas}>
                  {exerciseData.focusArea.map((area, index) => (
                    <View
                      key={index}
                      style={[
                        styles.focusTag,
                        { backgroundColor: theme.colors.primary },
                      ]}
                    >
                      <Text
                        style={[
                          styles.focusTagText,
                          { color: theme.colors.background },
                        ]}
                      >
                        {area}
                      </Text>
                    </View>
                  ))}
                </View>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View
          style={[styles.bottomNav, { backgroundColor: theme.colors.surface }]}
        >
          <View style={styles.progressContainer}>
            <TouchableOpacity style={styles.navButton}>
              <Text
                style={[
                  styles.navButtonText,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                ◀
              </Text>
            </TouchableOpacity>
            <Text
              style={[styles.progressText, { color: theme.colors.onSurface }]}
            >
              {exerciseData.currentExercise}/{exerciseData.totalExercises}
            </Text>
            <TouchableOpacity style={styles.navButton}>
              <Text
                style={[
                  styles.navButtonText,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                ▶
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            mode="contained"
            style={[
              styles.closeButton,
              { backgroundColor: theme.colors.primary },
            ]}
            labelStyle={{ color: theme.colors.background }}
            onPress={handleWorkoutStartPress}
          >
            START
          </Button>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 20 },
  headerTitle: { fontSize: 18, fontWeight: "700", letterSpacing: 0.5 },
  replaceButton: { marginRight: 8 },
  illustrationContainer: {
    alignItems: "center",
    paddingVertical: 32,
    marginBottom: 24,
  },
  imageContainer: {
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseImage: { width: 300, height: 200, borderRadius: 16 },
  tabContainer: {
    flexDirection: "row",
    borderRadius: 25,
    padding: 4,
    marginBottom: 24,
  },
  videoContainer: {
  width: "100%",
  height: 220,
  borderRadius: 16,
  overflow: "hidden",
  marginBottom: 20,
},

videoPlayer: {
  flex: 1,
  borderRadius: 16,
},
  tab: { flex: 1, paddingVertical: 12, borderRadius: 21, alignItems: "center" },
  tabText: { fontSize: 14, letterSpacing: 0.3 },
  animationContent: { gap: 20 },
  repeatsCard: { borderRadius: 16, elevation: 3 },
  repeatsContent: { paddingVertical: 20, alignItems: "center" },
  repeatsLabel: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 16,
  },
  counterContainer: { flexDirection: "row", alignItems: "center", gap: 24 },
  counterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: { fontSize: 24, fontWeight: "700" },
  counterValue: {
    fontSize: 32,
    fontWeight: "800",
    minWidth: 60,
    textAlign: "center",
  },
  startButton: { borderRadius: 25, paddingVertical: 8, elevation: 4 },
  instructionsContent: { gap: 20 },
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 8,
  },
  progressContainer: { flexDirection: "row", alignItems: "center", gap: 16 },
  navButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: { fontSize: 16, fontWeight: "600" },
  progressText: { fontSize: 16, fontWeight: "600" },
  closeButton: {
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 4,
    elevation: 4,
  },
});
