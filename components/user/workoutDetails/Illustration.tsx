import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import WebView from "react-native-webview";

interface IllustrationProps {
    selectedTab: string;
    exerciseData: {
        gif: string;
        youtubeUrl: string;
    }
}


const Illustration: React.FC<IllustrationProps>= ({selectedTab, exerciseData}) => {
  return (
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
  );
};

export default Illustration;

const styles = StyleSheet.create({
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
 
  videoContainer: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    overflow: "hidden",
  },

  videoPlayer: {
    flex: 1,
    borderRadius: 16,
  },
});
