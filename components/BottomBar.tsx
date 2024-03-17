import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";

const BottomBar = () => {
  // Define your icon action handlers
  const handlePressHome = () => {
    console.log("Home pressed");
    router.navigate("chat/chathistory");
  };

  const handlePressProfile = () => {
    console.log("Profile pressed");
    router.navigate("profile/profile");
  };

  // ... handle other icon presses similarly

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressHome}>
        <FontAwesome name="home" size={24} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePressProfile}>
        <FontAwesome name="user" size={24} color="#333" />
      </TouchableOpacity>

      {/* Add other icons as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  // ... Add other styles if needed
});

export default BottomBar;
