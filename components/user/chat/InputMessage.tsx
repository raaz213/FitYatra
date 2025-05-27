import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Surface, TextInput, useTheme } from "react-native-paper";
import { Message } from "../../../screens/user/ChatScreen";

interface InputMessageProps {
  flatListRef: React.RefObject<FlatList<Message> | null>;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  setInputText: (text: string) => void;
  inputText: string;
}

const InputMessage: React.FC<InputMessageProps> = ({
  messages,
  setMessages,
  setInputText,
  inputText,
  flatListRef,
}) => {
  const theme = useTheme();
  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: "user",
        timestamp: new Date(),
        senderName: "You",
      };
      setMessages([...messages, newMessage]);
      setInputText("");
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };
  return (
    <Surface
      style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}
      elevation={4}
    >
      <View style={styles.inputRow}>
        <TextInput
          mode="outlined"
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          style={styles.textInput}
          contentStyle={styles.textInputContent}
          outlineStyle={styles.textInputOutline}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage} disabled={!inputText.trim()}>
          <Text style={[styles.sendButton]}>Send</Text>
        </TouchableOpacity>
      </View>
    </Surface>
  );
};

export default InputMessage;

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    maxHeight: 40,
    marginRight: 8,
  },
  textInputContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  textInputOutline: {
    borderRadius: 10,
  },
  sendButton: {
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#06407a",
    color: "white",
    borderRadius: 10,
    textAlign: "center",
  },
});
