import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Card, Divider, List } from "react-native-paper";

const MenuItem = ({ navigation }: any) => {
  const [logModalVisible, setLogModelVisible] = useState(false);
  const [bodyMeasurementModalVisible, setBodyMeasurementModalVisible] =
    useState(false);

  const handlePress = () => {
    navigation.navigate("PersonalRecord");
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.menuContent}>
        <List.Item
          title="Workout History"
          description="View your past workouts"
          titleStyle={styles.menuText}
          descriptionStyle={styles.menuText}
          left={(props) => (
            <List.Icon {...props} icon="history" color="#06407a" />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate("WorkoutHistory")}
          style={styles.menuItem}
        />
        <Divider />
        <List.Item
          title="Personal Records"
          description="Track your best performances"
          titleStyle={styles.menuText}
          descriptionStyle={styles.menuText}
          left={(props) => (
            <List.Icon {...props} icon="chart-line" color="#06407a" />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handlePress}
          style={styles.menuItem}
        />
        <Divider />
        <List.Item
          title="Body Measurements"
          description="Monitor your progress"
          titleStyle={styles.menuText}
          descriptionStyle={styles.menuText}
          left={(props) => (
            <List.Icon {...props} icon="human" color="#06407a" />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate("BodyMeasurement")}
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
    backgroundColor: "#ffffff",
  },
  menuContent: {
    paddingVertical: 0,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuText: {
    color: "#06407a",
  },
});
