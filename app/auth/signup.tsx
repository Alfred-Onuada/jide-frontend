import { Stack, router } from "expo-router";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { UserFormData } from "../../types/RegistrationTypes";
import { handleRegisterUser } from "../../interfaces/authservice";

const CreateAccountScreen = () => {
  const [userData, setUserData] = useState<UserFormData>({
    fullName: "",
    matricNo: "",
    hospitalCardNo: "",
    password: "",
    confirmPassword: "",
    email: "",
    photo: "",
  } as UserFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateAccount = async () => {
    setIsLoading(true);
    var response = await handleRegisterUser(userData);
    if (!response.status) {
      console.log(response);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    router.navigate("/auth/signin");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setUserData({ ...userData, photo: (result as any).base64 });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Student Account</Text>
        <Text style={styles.headerSubtitle}>
          Enter with your Babcock Credentials
        </Text>
      </View>

      <TouchableOpacity
        style={styles.profileUpload}
        onPress={() => pickImage()}
      >
        <Image
          style={styles.profileUploadIcon}
          source={require("./../../assets/upload.png")} // replace with your local asset path or uri
        />
        <Text style={styles.profileUploadText}>Upload Photo Profile</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>School FullName</Text>
        <TextInput
          placeholder="School Fullname"
          value={userData.fullName}
          onChangeText={(value) =>
            setUserData({ ...userData, fullName: value })
          }
          style={styles.input}
        />
        <Text style={styles.inputTitle}>Matric No</Text>

        <TextInput
          placeholder="Matric No"
          value={userData.matricNo}
          onChangeText={(value) =>
            setUserData({ ...userData, matricNo: value })
          }
          style={styles.input}
        />
        <Text style={styles.inputTitle}>Hospital Card No</Text>

        <TextInput
          placeholder="Hospital Card No"
          value={userData.hospitalCardNo}
          onChangeText={(value) =>
            setUserData({ ...userData, hospitalCardNo: value })
          }
          style={styles.input}
        />
        <Text style={styles.inputTitle}>Password</Text>

        <TextInput
          placeholder="Password"
          value={userData.password}
          onChangeText={(value) =>
            setUserData({ ...userData, password: value })
          }
          style={styles.input}
          secureTextEntry
        />
        <Text style={styles.inputTitle}>Confirm Password</Text>

        <TextInput
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          onChangeText={(value) =>
            setUserData({ ...userData, confirmPassword: value })
          }
          style={styles.input}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateAccount}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="large" style={styles.inText} color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Create Student Account</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 5,
  },
  inText: {
    textAlign: "center",
    paddingVertical: 15,
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  input: {
    backgroundColor: "#FFF", // assuming a white background
    borderColor: "black", // light grey border
    borderWidth: 1,
    borderRadius: 30, // rounded corners
    paddingVertical: 15, // vertical padding
    paddingHorizontal: 20, // horizontal padding
    fontSize: 16, // text size
    color: "#09101D", // text color, assuming a dark grey
    marginBottom: 15, // margin bottom
  },
  inputTitle: {
    color: "#2972FE",
    paddingBottom: 10,
    fontSize: 16,
    left: 13,
  },
  button: {
    backgroundColor: "#2972FE", // blue background
    borderRadius: 25, // rounded corners
    paddingVertical: 18, // vertical padding
    paddingHorizontal: 20, // horizontal padding
    alignItems: "center",
    justifyContent: "center",
    height: 55, // fixed height for the button
    marginVertical: 25, // margin top and bottom
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  profileUpload: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    padding: 16,
    borderRadius: 100, // circular border if the image is a circle
    backgroundColor: "#ECF0F1", // light grey background
    overflow: "hidden", // ensures the image does not bleed outside the border radius
  },
  profileUploadIcon: {
    width: 80, // match your icon size
    height: 80, // match your icon size
  },
  profileUploadText: {
    color: "#A5ABB3",
    textAlign: "center",
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  // Add a back button style if you don't have an icon and want just text
  backText: {
    fontSize: 18,
    color: "#2972FE", // Assuming blue color to match the button
    padding: 20, // For touchable area
  },
  header: {
    marginTop: 20, // adjust as needed for your layout
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#09101D", // dark text for the title
    marginBottom: 10, // space between title and subtitle
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#858C94", // lighter grey for subtitle
    marginBottom: 30, // space between subtitle and the rest
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20,
  },
});

export default CreateAccountScreen;
