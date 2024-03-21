import {
  Stack,
  router,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { UserFormData } from "../../types/RegistrationTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MessageAi } from "../../interfaces/userservice";

// Define the type for each message
type Message = {
  id: string;
  chatId: string;
  sender: string;
  senderName?: string;
  text: string;
  dateTime: Date;
  profilepicture: string;
};

type MessageItemProps = {
  message: Message;
  isSender: boolean;
};

// Define props for the MessagingScreen component
type MessagingScreenProps = {
  route: {
    params: {
      chatId: string;
    };
  };
};

// Mock messages data
var initialMessages: Message[] = [
  {
    id: "1",
    chatId: "1",
    sender: "AI",
    text: "Hi i am your AI Assistant How can i help you?",
    dateTime: new Date("2024-01-01T12:05:00Z"),
    profilepicture: "https://via.placeholder.com/50",
  },
];
initialMessages.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
// MessageItem component

const Header = () => (
  <View style={styles.header}>
    <Image
      source={{ uri: "https://via.placeholder.com/50" }} // Replace with the actual image source
      style={styles.doctorProfilePic}
    />
    <Text style={styles.headerTitle}>AI Assistant</Text>
  </View>
);
const MessageItem: React.FC<MessageItemProps> = ({ message, isSender }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        isSender ? styles.senderRow : styles.receiverRow,
      ]}
    >
      {!isSender && (
        <Image source={{ uri: message.profilepicture }} style={styles.avatar} />
      )}
      <View
        style={[
          styles.messageBubble,
          isSender ? styles.senderBubble : styles.receiverBubble,
        ]}
      >
        <Text style={[isSender ? styles.senderText : styles.receiverText]}>
          {message.text}
        </Text>
      </View>
    </View>
  );
};

// MessagingScreen component
const AICHAT: React.FC<MessagingScreenProps> = ({
  route,
}: MessagingScreenProps) => {
  var { id: chatId, userID: users } = useLocalSearchParams() as any as {
    id: string;
    userID: UserFormData;
  };
  chatId = "1";

  const [user, setUser] = useState<UserFormData>({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await AsyncStorage.getItem("user");
        if (res !== null) {
          const userData = JSON.parse(res) as UserFormData;
          setUser(userData);
        } else {
          router.navigate("/auth/signin");
        }
      } catch (error) {
        // Handle errors, e.g., parsing errors or AsyncStorage errors
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const [messages, setMessages] = useState<Message[]>(
    initialMessages.filter((message) => message.chatId === chatId)
  );
  useEffect(() => {
    const LoadMessages = async () => {
      var messages = await AsyncStorage.getItem("aimessages");
      if (messages !== null) {
        setMessages(JSON.parse(messages) as Message[]);
        console.log("here messages restored");
      }
    };
    LoadMessages();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem("aimessages", JSON.stringify(messages)).then((res) => {
      console.log("here messages saved");
    });
  }, [messages]);
  const [inputText, setInputText] = useState<string>("");
  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    flatListRef?.current?.scrollToEnd({ animated: true });
  });

  const handleSendMessage = async () => {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      chatId: chatId,
      sender: user._id as string,
      text: inputText,
      dateTime: new Date(),
      profilepicture: "https://via.placeholder.com/50", // Replace with actual profile picture
    };
    setMessages((messages) => [...messages, newMessage]);

    var airesponse = await MessageAi({
      message: inputText,
      userId: user._id as string,
    });
    console.log("here ai");
    console.log(airesponse);

    const aimessage: Message = {
      id: Math.random().toString(36).substring(7),
      chatId: chatId,
      sender: "AI",
      text: airesponse.data as string,
      dateTime: new Date(new Date().getTime() + 60000), // Add 1 minute to the current date and time
      profilepicture: "https://via.placeholder.com/50", // Replace with actual profile picture
    };
    setMessages((messages) => [...messages, aimessage]);
    setInputText("");
  };

  const isSender = (message: Message) => message.sender === user._id;
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageItem message={item} isSender={isSender(item)} />
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />

        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  // safeArea: {
  //   flex: 1,
  //   backgroundColor: "#f9f9f9",
  // },
  container: {
    flex: 1,
  },
  messageContainer: {
    paddingTop: 10,
    margin: 10,
    borderRadius: 20,
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  messageRow: {
    flexDirection: "row",
    padding: 10,
  },
  senderRow: {
    justifyContent: "flex-end",
  },
  receiverRow: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    borderRadius: 20,
    padding: 10,
    margin: 4,
    maxWidth: "70%",
  },
  senderBubble: {
    backgroundColor: "blue",
  },
  receiverBubble: {
    backgroundColor: "#ececec",
  },
  receiverText: {
    color: "#555",
  },
  senderText: {
    color: "white",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 8,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DDDDDD",
  },
  doctorProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AICHAT;
