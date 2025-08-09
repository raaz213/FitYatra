import { View, StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/native";
import {
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

export default function TabBar({
  navigation,
  state,
  descriptors,
  insets,
}: BottomTabBarProps) {
  return (
    <LinearGradient
      colors={["#81ace6ff", "#81ace6ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({ route, preventDefault }) => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }
        }}
        renderIcon={({ route, focused, color}) =>
          descriptors[route.key].options.tabBarIcon?.({
            focused,
            color: focused ? '#06407a': '#111111',
            size: 24,
          }) || null
        }
        
        getLabelText={({ route }) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : typeof options.title === "string"
              ? options.title
              : route.name;

          return label;
        }}
        style={styles.bar}
        activeColor="#032163ff" 
        inactiveColor="#111111" 
        
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
  },
  bar: {
    backgroundColor: "transparent", 
    height: 80,
  },
});
