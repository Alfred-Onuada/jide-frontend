import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import BottomBar from "../../components/BottomBar";
import { getFromLocalStorage } from "../../utilities/localstorage";
import { DoctorsResponse, UserFormData } from "../../types/RegistrationTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetDoctors } from "../../interfaces/userservice";

export interface DoctorCardProps {
  _id: string;
  name: string;
  avatar: string;
  user: UserFormData;
}
const DoctorCard: React.FC<DoctorCardProps> = ({ _id, name, avatar, user }) => {
  function getDoctorImageUri(id: number) {
    switch (id) {
      case 1:
        return require("../../assets/doctor1.png");
      case 2:
        return require("../../assets/doctor2.png");
      case 3:
        return require("../../assets/doctor3.png");
      case 4:
        return require("../../assets/doctor4.png");
      // Add cases for other doctors' names and their corresponding images
      default:
        return require("../../assets/doctor1.png"); // default image
    }
  }
  const isLive = false;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/chat/messaging",
          params: { id: _id, receiverID: _id, name: name, avatar: avatar },
        })
      }
    >
      <View style={styles.doctorCardContainer}>
        <Image
          resizeMode="cover"
          source={{ uri: avatar }}
          style={styles.doctorImage}
        />
        <View style={styles.doctorInfoContainer}>
          <Text style={styles.doctorName}>{name}</Text>
        </View>
      </View>
    </Pressable>
  );
};

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [user, setUser] = useState<UserFormData>({});
  const [doctorsData, setDoctorsData] = useState<DoctorCardProps[]>([]);
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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await GetDoctors();
        if (response !== null) {
          const doctors = JSON.parse(
            JSON.stringify(response.data)
          ) as DoctorCardProps[];
          setDoctorsData(doctors);
        } else {
          router.navigate("/auth/signin");
        }
      } catch (error) {
        // Handle errors, e.g., parsing errors or AsyncStorage errors
        console.error(error);
      }
    };

    fetchDoctors();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.profileCardContainer}>
        <View style={styles.profileInfoContainer}>
          <Image
            resizeMode="cover"
            source={require("../../assets/icon.png")}
            style={styles.profilePic}
          />
          <View style={styles.usernameContainer}>
            <Text style={styles.usernameText}>{user.name}</Text>
          </View>
        </View>
        <View style={styles.actionIconContainer}>
          <Image
            resizeMode="cover"
            source={{uri: user.avatar}}
            style={styles.actionIcon}
          />
        </View>
      </View>
      <ScrollView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.headerContainer}></View>
        <TouchableOpacity onPress={() => router.navigate("chat/ai")}>
          <View style={styles.chatContainer}>
            <Text style={styles.chatText}>Chat with Our SmartAi</Text>
          </View>
        </TouchableOpacity>
        {user.role === "patient" && (
        <Text style={styles.availableDoctorsText}>Available Doctors</Text> )}
        {user.role === "patient" && (
        <View style={styles.doctorsListContainer}>
          {doctorsData.map((doctor, index) => (
            <DoctorCard
              key={index}
              _id={doctor._id}
              name={doctor.name}
              avatar={doctor.avatar}
              user={user}
            />
          ))}
          
        </View>
        )}
      </ScrollView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  timeText: {
    fontFamily: "SF Pro Text",
    fontSize: 15,
    fontWeight: "600",
    color: "#09101D",
  },
  userCardContainer: {
    marginTop: 20,
  },
  cardNumberText: {
    color: "#858C94",
    fontSize: 13,
    margin: 20,
    alignSelf: "flex-start",
  },
  chatContainer: {
    backgroundColor: "#2972FE",
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 37,
    paddingHorizontal: 44,
  },
  chatText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  availableDoctorsText: {
    marginLeft: 20,
    color: "#2C3A4B",
    fontSize: 20,
    fontWeight: "600",
  },
  doctorsListContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  doctorCardContainer: {
    backgroundColor: "#F0F4F8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EBEEF2",
    flexDirection: "row",
    marginVertical: 8,
    padding: 10,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  doctorInfoContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#656F77",
  },
  profileCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  usernameContainer: {
    marginLeft: 10,
  },
  usernameText: {
    fontSize: 16,
    color: "#09101D",
    fontWeight: "600",
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(41, 114, 254, 0.10)",
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
});

export default App;
