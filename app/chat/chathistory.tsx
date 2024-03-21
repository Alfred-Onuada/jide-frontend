import React, { useEffect, useState } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { format } from "date-fns";
import BottomBar from "../../components/BottomBar";
import { Room, UserFormData } from "../../types/RegistrationTypes";
import { FetchProfile, GetRooms } from "../../interfaces/userservice";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for each chat history item
type ChatHistoryItem = {
  id: string;
  name: string;
  lastMessage: string;
  dateTime: Date;
  avatar: string;
  profile?: UserFormData;
};

// Mock chat history data

export default function App() {
  var router = useRouter();
  var localparam = useLocalSearchParams();
  const [userData, setUserData] = useState<UserFormData>({});
  const [chatHistoryData, setChatHistoryData] = useState<Room[]>([]);
  const [userAvi, setUserAv] = useState<string>(
    "https://via.placeholder.com/50"
  );
  const [username, setUserName] = useState<string>("");
  useEffect(() => {
    const fetchProfile = async () => {
      var user = await AsyncStorage.getItem("user");
      var upuser = JSON.parse(user as string) as UserFormData;
      setUserData(upuser);
      var rooms = await GetRooms(upuser._id as string);
      // rooms.data?.forEach(async (x) => {
      //   var receiver: string = x.participants.find(
      //     (res) => res !== userData._id
      //   ) as string;
      //   var rece = await FetchProfile(receiver);
      //   x.profile = rece.data;
      // });
      const fetchProfilesAndUpdateRooms = async (
        rooms: Room[]
      ): Promise<Room[]> => {
        const fetchPromises = rooms.map(async (room) => {
          console.log("room");
          console.log(room);
          const receiver = room.participants[1];

          if (!receiver) return room; // Or handle this case as needed

          try {
            const rece = await FetchProfile(receiver);
            return { ...room, profile: rece.data };
          } catch (error) {
            console.error(error);
            // Handle error (you might want to return room as is or handle differently)
            return room;
          }
        });

        return await Promise.all(fetchPromises);
      };

      const updatedRooms = await fetchProfilesAndUpdateRooms(
        rooms.data as Room[]
      );

      setChatHistoryData(updatedRooms as Room[]);
    };
    fetchProfile();
  }, []);
  const renderChatHistoryItem = ({ item }: { item: Room }) => {
    var receiver: string = item.participants.find(
      (res) => res !== userData._id
    ) as string;

    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "chat/messaging",
            params: {
              id: item._id,
              receiverID: receiver,
              roomID: item._id,
              name: item.profile?.name,
              avatar: item.profile?.avatar,
            },
          })
        }
      >
        <View style={styles.chatItem}>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
          />

          <Image source={{ uri: item.profile?.avatar }} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.profile?.name}</Text>
            {/* <Text style={styles.lastMessage}>{item._id}</Text> */}
          </View>
          <Text style={styles.time}>{format(item.updatedAt, "p")}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        <Icon
          name="user-circle-o"
          size={24}
          color="#333"
          onPress={() => router.navigate("profile/profile")}
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>
      <FlatList
        data={chatHistoryData}
        keyExtractor={(item) => item._id}
        renderItem={renderChatHistoryItem}
      />
      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingBottom: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  searchInput: {
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  chatItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333333",
  },
  lastMessage: {
    color: "#666666",
    fontSize: 14,
    marginTop: 4,
  },
  time: {
    fontSize: 14,
    color: "#A5A5A5",
  },
  // ... Add more styles as needed for the design
});
