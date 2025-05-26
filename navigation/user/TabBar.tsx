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
      colors={["#4c669f", "#3b5998", "#192f6a"]}
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
        renderIcon={({ route, focused, color }) =>
          descriptors[route.key].options.tabBarIcon?.({
            focused,
            color,
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
        activeColor="#848687" 
        inactiveColor="#FFFFFFAA" 
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
  },
});
