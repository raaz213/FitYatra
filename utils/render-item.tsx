import React from "react";
import { View, StyleSheet, Image } from "react-native";

interface RenderItemOptions {
  rounded?: boolean;
}

export const renderItem = ({ rounded = false }: RenderItemOptions) => {
  return ({ item, index }: { item: string; index: number }) => (
    <View key={index} style={[styles.item]}>
      <Image
        source={{ uri: item }} 
        style={{
          width: "100%", 
          height: "100%", 
          resizeMode: "cover",
          borderRadius:  10 
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
