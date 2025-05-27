import { StyleSheet, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { window } from "../../../constants/sizes";
import { Message } from "../../../screens/user/ChatScreen";

const RenderMessage = ({ item }: { item: Message }) => {
  const isUser = item.sender === "user";
 

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <View
      style={[
        styles.messageContainer,
        { justifyContent: isUser ? "flex-end" : "flex-start" },
      ]}
    >
      <View style={[styles.messageBubble, { maxWidth: window.width * 0.75 }]}>
        <Surface
          style={[
            styles.bubbleContent,
            {
              backgroundColor: isUser
                ? `#06407a`
                : '#ffffff',
              elevation: 2,
            },
          ]}
        >
          {!isUser && (
            <Text
              variant="labelSmall"
              style={[styles.senderName, { color: '#06407a' }]}
            >
              {item.senderName}
            </Text>
          )}
          <Text
            variant="bodyMedium"
            style={{
              color: isUser ? `white` : "black",
              lineHeight: 20,
            }}
          >
            {item.text}
          </Text>
          <Text
            variant="labelSmall"
            style={{
              marginTop: 4,
              alignSelf: "flex-end",
              color: isUser ? `#06407a` : "#e0e0e0",
            }}
          >
            {formatTime(item.timestamp)}
          </Text>
        </Surface>
      </View>
    </View>
  );
};

export default RenderMessage;

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "flex-end",
  },
  messageBubble: {
    flex: 0,
  },
  bubbleContent: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 2,
  },
  senderName: {
    fontWeight: "600",
    marginBottom: 4,
  },
});
