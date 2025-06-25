import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Badge, Button, Modal, Surface, TextInput } from "react-native-paper";

interface GoalModalProps {
  visible: boolean;
  onClose: () => void;
  onSetGoal: (goalInput: number) => Promise<void>;
}

const GoalModal: React.FC<GoalModalProps> = ({
  visible,
  onClose,
  onSetGoal,
}) => {
  const [goalInput, setGoalInput] = useState(0);

  const handleSetGoal = async () => {
    await onSetGoal(goalInput);
    setGoalInput(0);
  };

  const handleClose = () => {
    setGoalInput(0);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={handleClose}
      contentContainerStyle={{ padding: 20 }}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <TouchableWithoutFeedback>
          <Surface elevation={5} style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Step goal</Text>

            <View style={styles.modalContent}>
              <TextInput
                placeholder="Enter amount"
                keyboardType="number-pad"
                value={goalInput == 0 ? "" : goalInput.toString()}
                onChangeText={(text) => setGoalInput(Number(text))}
                placeholderTextColor="#94A3B8"
              />
              <Badge style={styles.stepsBadge}>steps</Badge>
            </View>

            <View style={styles.buttonContainer}>
              <Button mode="outlined" onPress={handleClose}>
                Cancel
              </Button>
              <Button mode="contained" onPress={handleSetGoal}>
                Add
              </Button>
            </View>
          </Surface>
        </TouchableWithoutFeedback>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: "column",
    gap: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContent: {
    flexDirection: "column",
    gap: 10,
    position: "relative",
  },
  stepsBadge: {
    backgroundColor: "blue",
    position: "absolute",
    top: 25,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default GoalModal;
