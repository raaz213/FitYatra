import React, { useState, useRef } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RenderMessage from "../../components/user/chat/RenderMessage";
import { LinearGradient } from "expo-linear-gradient";
import InputMessage from "../../components/user/chat/InputMessage";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  senderName: string;
  avatar?: string;
}

const ChatScreen: React.FC = () => {
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

  return (
    <LinearGradient colors={["#d3e1ed", "#d3e1ed"]} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={styles.chatContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
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
            <InputMessage
              flatListRef={flatListRef}
              inputText={inputText}
              setInputText={setInputText}
              setMessages={setMessages}
              messages={messages}
            />
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
});

export default ChatScreen;
