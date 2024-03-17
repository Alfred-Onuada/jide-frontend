import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function Selection() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Image source={require("./../../assets/icon.png")}></Image>

      <Text style={styles.welcome}>Welcome to SmartDoc</Text>

      <TouchableOpacity
        style={styles.inBtn}
        onPress={() => router.navigate("/auth/signin")}
      >
        <Text style={styles.inText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.upBtn}
        onPress={() => router.navigate("/auth/signup")}
      >
        <Text style={styles.upText}>Create Student Account</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 40,
    marginBottom: 60,
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
  upBtn: {
    width: "90%",
    borderRadius: 20,
    marginVertical: 10,
    borderColor: "#2972FE",
    borderWidth: 1,
  },
  upText: {
    textAlign: "center",
    paddingVertical: 15,
    color: "#2972FE",
    fontSize: 18,
  },
});
