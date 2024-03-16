import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import ChatHistoryScreen from "../components/ChatHistoryScreen";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Image source={require('./../assets/home1.png')}></Image>
      <View style={styles.bottomStyle}>

      </View>
      <StatusBar style="auto" /> */}
      <ChatHistoryScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  bottomStyle: {
    backgroundColor: "#fff",
    height: 400,
    width: "100%",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
