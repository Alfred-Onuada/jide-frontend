import {
  Stack,
  router,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import React, { useEffect, useState } from "react";
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
import { SendMessage } from "../../interfaces/userservice";
import axios from "axios";
import { API } from "../../constants/endpoints";

// Define the type for each message
export type Message = {
  senderId?: string;
  recipientId?: string;
  roomId?: string;
  text?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type MessageItemProps = {
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
var initialMessages: Message[] = [];
initialMessages.sort(
  (a, b) =>
    new Date(a.createdAt as string).getTime() -
    new Date(b.createdAt as string).getTime()
);
// MessageItem component
const Header = () => (
  <View style={styles.header}>
    <Image
      source={{ uri: "https://via.placeholder.com/50" }} // Replace with the actual image source
      style={styles.doctorProfilePic}
    />
    <Text style={styles.headerTitle}>Messaging</Text>
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
      {/* {!isSender && (
        <Image source={{ uri: message.profilepicture }} style={styles.avatar} />
      )} */}
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
const MessagingScreen: React.FC<MessagingScreenProps> = ({
  route,
}: MessagingScreenProps) => {
  const {
    id: chatId,
    receiverID: receiver,
    roomID: room,
  } = useLocalSearchParams() as any as {
    id: string;
    receiverID: string;
    roomID: string;
  };
  const [user, setUser] = useState<UserFormData>({});
  const [roomID, setRoomId] = useState<string>("");
  console.log(user._id);

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
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const [messages, setMessages] = useState<Message[]>(
    initialMessages.filter((message) => message._id === chatId)
  );
  const [inputText, setInputText] = useState<string>("");
  useEffect(() => {
    const LoadMessages = async () => {
      var messages = await AsyncStorage.getItem("doctormessages");
      if (messages !== null) {
        var messagess = JSON.parse(messages) as Message[];
        messagess.forEach((x) => {
          if (x.senderId == user._id && x._id == receiver) {
            setMessages((messages) => [...messages, x]);
          }
        });
        console.log("here messages restored");
      }
    };
    LoadMessages();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem("doctormessages", JSON.stringify(messages)).then(
      (res) => {
        console.log("here messages saved");
      }
    );
  }, [messages]);
  const handleSendMessage = async () => {
    if (room || roomID) {
      var message = await SendMessage({
        senderId: user._id,
        roomId: room,
        text: inputText,
      });
      console.log("here");
      console.log(message);
      setRoomId(message.data?.roomId as string);
      setMessages((messages) => [...messages, message.data as Message]);
      setInputText("");
    } else {
      var message = await SendMessage({
        senderId: user._id,
        text: inputText,
        recipientId: receiver,
      });
      console.log("here");
      console.log(message);
      setRoomId(message.data?.roomId as string);
      setMessages((messages) => [...messages, message.data as Message]);
      setInputText("");
    }
  };
  const FetchMessages = () => {
    if (roomID) {
      axios.get(API.ROOMS + `/${room}` + "/messages").then((res) => {
        if (res.status !== 200) return;
        var message = res.data.message;
        var messagess: Message[] = res.data.data;
        setMessages(messagess);
      });
    }
  };

  FetchMessages();
  const isSender = (message: Message) => message.senderId === user._id;
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <FlatList
        data={messages}
        keyExtractor={(item) => item._id as string}
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

export default MessagingScreen;
