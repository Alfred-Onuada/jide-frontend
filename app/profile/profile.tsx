import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LoginResponse, UserFormData } from "../../types/RegistrationTypes";
import { useEffect, useState } from "react";
import { FetchProfile, UpdateProfile } from "../../interfaces/userservice";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utilities/localstorage";
import showToast from "../../services/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootSiblingParent } from "react-native-root-siblings";

export default function Profile() {
  const [userData, setUserData] = useState<UserFormData>({});
  const [isloading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      var user = await AsyncStorage.getItem("user");
      var upuser = JSON.parse(user as string) as UserFormData;
      var response = await FetchProfile(upuser._id as string);
      if (!response.status) {
        showToast({ msg: response.message as string, danger: true });
        setIsLoading(false);
        return;
      }
      setUserData(response.data as UserFormData);
      setIsLoading(false);
    };
    fetchProfile();
  }, []);
  const HandleUpdateProfile = async () => {
    setIsLoading(true);
    var response = await UpdateProfile(userData);
    if (!response.status) {
      showToast({ msg: response.message as string, danger: true });
      console.log(response);
      setIsLoading(false);
      return;
    }
    //toast success
    setIsLoading(false);
    showToast({ msg: response.message as string, danger: false });
  };
  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.navigate("/auth/signin");
  };

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "No" },
      { text: "Yes", onPress: handleLogout },
    ]);
  };
  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerBackTitleVisible: false,
            headerTitle: "My Profile",
            headerTintColor: "#2972FE",
            headerStyle: { backgroundColor: "#fff" },
          }}
        />
        <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <Image
          source={{ uri: userData.avatar }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginVertical: 20,
          }}
        ></Image>

        <View
          style={{
            width: "95%",
            height: 1,
            backgroundColor: "#EBEEF2",
            marginBottom: 20,
          }}
        ></View>

        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={styles.inputLabel}>Full Name*</Text>
          <View style={styles.shadow}>
            <TextInput
              placeholder="Olajide Oluwaseun"
              style={styles.input}
              value={userData.fullName}
              onChangeText={(value) =>
                setUserData({ ...userData, fullName: value })
              }
            ></TextInput>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={styles.inputLabel}>Email*</Text>
          <View style={styles.shadow}>
            <TextInput
              placeholder={userData.email}
              style={styles.input}
              value={userData.email}
              onChangeText={(value) =>
                setUserData({ ...userData, email: value })
              }
            ></TextInput>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={styles.inputLabel}>Gender*</Text>
          <View style={styles.shadow}>
            <TextInput
              placeholder="Male"
              style={styles.input}
              value={userData.gender}
              onChangeText={(value) =>
                setUserData({ ...userData, gender: value })
              }
            ></TextInput>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={styles.inputLabel}>Date of Birth*</Text>
          <View style={styles.shadow}>
            <TextInput
              placeholder="10/06/2003"
              style={styles.input}
              value={userData.dateOfBirth?.toDateString()}
              onChangeText={(value) =>
                setUserData({ ...userData, dateOfBirth: new Date(value) })
              }
            ></TextInput>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={styles.inputLabel}>Address*</Text>
          <View style={styles.shadow}>
            <TextInput
              placeholder="Plot 10 Lekki Phase 5"
              style={styles.input}
              onChangeText={(value) =>
                setUserData({ ...userData, address: value })
              }
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity
          style={styles.inBtn}
          onPress={() => HandleUpdateProfile()}
          disabled={isloading}
        >
          {isloading ? (
            <ActivityIndicator
              size="large"
              style={styles.inText}
              color="#FFF"
            />
          ) : (
            <Text style={styles.inText}>Confirm</Text>
          )}
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    position: "absolute",
    top: 40, // Adjust position as needed
    right: 20,
    padding: 10,
    backgroundColor: "#2972FE", // Set a suitable color
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
  },
  inBtn: {
    width: "90%",
    borderRadius: 20,
    backgroundColor: "#2972FE",
    marginVertical: 10,
  },
  inText: {
    textAlign: "center",
    paddingVertical: 15,
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 2,
    borderColor: "#EBEEF2",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 18,
  },
  inputLabel: {
    textAlign: "left",
    width: "85%",
    marginBottom: 10,
    fontSize: 16,
    color: "#2C3A4B",
  },
  shadow: {
    shadowColor: "#2972FE", // Optional: Set shadow color, defaults to black
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4, // Adjust opacity for shadow intensity
    shadowRadius: 5,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
});
