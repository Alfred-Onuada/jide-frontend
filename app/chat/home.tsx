import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Stack, router } from "expo-router";
import BottomBar from "../../components/BottomBar";

interface DoctorCardProps {
  id: number;
  name: string;
  specialty: string;
  imageUri: string;
}
const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  name,
  specialty,
  imageUri,
}) => {
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
  console.log(imageUri);
  const isLive = false;
  return (
    <View style={styles.doctorCardContainer}>
      <Image
        resizeMode="cover"
        source={getDoctorImageUri(id)}
        style={styles.doctorImage}
      />
      <Pressable
        onPress={() =>
          router.push({ pathname: "/chat/messaging", params: { id } })
        }
      >
        <View style={styles.doctorInfoContainer}>
          <Text style={styles.doctorName}>{name}</Text>
          <Text style={styles.doctorSpecialty}>{specialty}</Text>
        </View>
      </Pressable>
    </View>
  );
};

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const doctorsData = [
    {
      id: 1,
      name: "Dr. Comfort Bell",
      specialty: "Cardio Specialist",
      imageUri: "../../assets/doctor1.png",
    },
    {
      id: 2,
      name: "Dr. Onuada Alfred",
      specialty: "Dental Specialist",
      imageUri: "../../assets/doctor2.png",
    },
    {
      id: 3,
      name: "Dr. Comfort Bell",
      specialty: "Cardio Specialist",
      imageUri: "../../assets/doctor3.png",
    },
    {
      id: 4,
      name: "Dr. Onuada Alfred",
      specialty: "Dental Specialist",
      imageUri: "../../assets/doctor4.png",
    },
  ];

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
            <Text style={styles.usernameText}>JOLOMI OLAJIDE</Text>
          </View>
        </View>
        <View style={styles.actionIconContainer}>
          <Image
            resizeMode="cover"
            source={require("./../../assets/profile.jpeg")}
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
        <Text style={styles.availableDoctorsText}>Available Doctors</Text>
        <View style={styles.doctorsListContainer}>
          {doctorsData.map((doctor, index) => (
            <DoctorCard
              key={index}
              id={doctor.id}
              name={doctor.name}
              specialty={doctor.specialty}
              imageUri={doctor.imageUri}
            />
          ))}
        </View>
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
    padding: 20,
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
    margin: 20,
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
