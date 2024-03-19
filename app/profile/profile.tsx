import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { UserFormData } from "../../types/RegistrationTypes";
import { useState } from "react";
import { UpdateProfile } from "../../interfaces/userservice";

export default function Profile() {
  const [userData, setUserData] = useState<UserFormData>({
    fullName: "",
    matricNo: "",
    hospitalCardNo: "",
    password: "",
    confirmPassword: "",
    email: "",
    photo: "",
    gender: "",
  } as UserFormData);

  const HandleUpdateProfile = async () => {
    var response = await UpdateProfile(userData);
    if (!response.status) {
      console.log(response);
      return;
    }
    //toast success
    console.log("successfull");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: "My Profile",
          headerTintColor: "#2972FE",
          headerStyle: { backgroundColor: "#fff" },
        }}
      />

      <Image
        source={require("./../../assets/profile.jpeg")}
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
            placeholder="olajide@google.com"
            style={styles.input}
            onChangeText={(value) => setUserData({ ...userData, email: value })}
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
      >
        <Text style={styles.inText}>Confirm</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
