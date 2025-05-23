import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  TextInput,
  Text,
  useTheme,
  Surface,
  Divider,
} from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RenderMessage from "../../components/user/chat/RenderMessage";
import { LinearGradient } from "expo-linear-gradient";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  senderName: string;
  avatar?: string;
}

const ChatScreen: React.FC = () => {
  const theme = useTheme();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How are you doing today?",
      sender: "other",
      timestamp: new Date(Date.now() - 120000),
      senderName: "Sarah Wilson",
      avatar: "SW",
    },
    {
      id: "2",
      text: "Hi Sarah! I'm doing great, thanks for asking. How about you?",
      sender: "user",
      timestamp: new Date(Date.now() - 60000),
      senderName: "You",
    },
    {
      id: "3",
      text: "I'm doing well too! Working on some exciting projects. Are you free for a quick call later?",
      sender: "other",
      timestamp: new Date(Date.now() - 30000),
      senderName: "Sarah Wilson",
      avatar: "SW",
    },
  ]);
  const [inputText, setInputText] = useState("");

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
    <LinearGradient colors={["#6f6f73", "#fafafc"]} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={styles.chatContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <RenderMessage item={item} />}
              style={styles.messagesList}
              contentContainerStyle={styles.messagesContainer}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({ animated: true })
              }
            />

            <Divider />

            <Surface
              style={[
                styles.inputContainer,
                { backgroundColor: theme.colors.surface },
              ]}
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
                <TouchableOpacity
                  onPress={sendMessage}
                  disabled={!inputText.trim()}
                >
                  <Text style={[styles.sendButton]}>Send</Text>
                </TouchableOpacity>
              </View>
            </Surface>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "flex-end",
  },

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
    backgroundColor: "#667eea",
    color: "white",
    borderRadius: 10,
    textAlign: "center",
  },
});

export default ChatScreen;
