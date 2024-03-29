import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { LoginRequest, UserFormData } from "../../types/RegistrationTypes";
import { handleLogin } from "../../interfaces/authservice";
import showToast from "../../services/toast";
import { RootSiblingParent } from "react-native-root-siblings";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const HandleSignin = async () => {
    console.log(email);
    console.log(password);
    setIsLoading(true);
    const request: LoginRequest = {
      email: email,
      password: password,
    };
    const response = await handleLogin(request);
    if (!response.status) {
      showToast({ msg: response.message as string, danger: true });
      console.log(response);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    showToast({ msg: response.message as string, danger: false });
    router.push({
      pathname: "/chat/home",
      params: { user: response.data as UserFormData },
    });
  };
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user !== null) {
          router.push({
            pathname: "/chat/home",
            params: { user: user as UserFormData },
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    checkUser();
  }, [router]);
  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <Image
          source={require("./../../assets/icon.png")}
          style={{
            width: 200,
            height: 200,
            resizeMode: "cover",
            marginVertical: 50,
          }}
        ></Image>
        <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 30 }}>
          Sign In For Free
        </Text>

        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={styles.inputLabel}>Email*</Text>
          <TextInput
            placeholder="john@google.com"
            style={styles.input}
            onChangeText={(e) => setEmail(e.toLocaleLowerCase())}
          ></TextInput>
        </View>

        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Text style={styles.inputLabel}>Password*</Text>
          <TextInput
            placeholder="john@google.com"
            style={styles.input}
            secureTextEntry
            onChangeText={(e) => setPassword(e)}
          ></TextInput>
        </View>

        <TouchableOpacity
          style={styles.inBtn}
          onPress={() => HandleSignin()}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator
              size="large"
              style={styles.inText}
              color="#FFF"
            />
          ) : (
            <Text style={styles.inText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <Text style={{ fontSize: 16, marginTop: 10 }}>
          Don't have an account?{" "}
          <Link href={"/auth/signup"} style={{ color: "#2972FE" }}>
            Sign Up
          </Link>
        </Text>

        <StatusBar style="auto" />
      </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "40%",
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
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 18,
  },
  inputLabel: {
    textAlign: "left",
    width: "80%",
    marginBottom: 10,
    fontSize: 16,
  },
});
