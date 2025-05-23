import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, Divider, List } from "react-native-paper";

const MenuItem = () => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.menuContent}>
        <List.Item
          title="Workout History"
          description="View your past workouts"
          titleStyle={styles.menuText}
          descriptionStyle={styles.menuText}
          left={(props) => (
            <List.Icon {...props} icon="history" color="#667eea" />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
          style={styles.menuItem}
        />
        <Divider />
        <List.Item
          title="Personal Records"
          description="Track your best performances"
          titleStyle={styles.menuText}
          descriptionStyle={styles.menuText}
          left={(props) => (
            <List.Icon {...props} icon="chart-line" color="#667eea" />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
          style={styles.menuItem}
        />
        <Divider />
        <List.Item
          title="Body Measurements"
          description="Monitor your progress"
          titleStyle={styles.menuText}
          descriptionStyle={styles.menuText}
          left={(props) => (
            <List.Icon {...props} icon="human" color="#667eea" />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
          style={styles.menuItem}
        />
        <Divider />
        <List.Item
          title="Nutrition Tracking"
          description="Log your meals and calories"
          titleStyle={styles.menuText}
          descriptionStyle={styles.menuText}
          left={(props) => (
            <List.Icon {...props} icon="food-apple" color="#667eea" />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" color="#f0f0f0" />}
          onPress={() => {}}
          style={styles.menuItem}
        />
      </Card.Content>
    </Card>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  card: {
    margin: 12,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#c7c7c7",
  },
  menuContent: {
    paddingVertical: 0,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuText: {
    color: "#171717",
  },
});
