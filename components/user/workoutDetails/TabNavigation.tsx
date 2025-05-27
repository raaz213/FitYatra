import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

interface TabNavigationProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  selectedTab,
  setSelectedTab,
}) => {
  const tabs = ["Animation", "How to do"];

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
  };
  const theme = useTheme();
  return (
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
              backgroundColor: "#06407a",
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
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    borderRadius: 25,
    padding: 4,
    marginBottom: 24,
  },
  tab: { flex: 1, paddingVertical: 12, borderRadius: 21, alignItems: "center" },
  tabText: { fontSize: 14, letterSpacing: 0.3 },
});
