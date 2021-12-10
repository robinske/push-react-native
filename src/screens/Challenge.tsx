import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

import { getChallenge, updateChallenge } from "../api/verify";

const Challenge = ({ route, navigation }) => {
  // const { factorSid } = route.params;
  const challenge = await getChallenge("factorSid", "challengeSid");

  return (
    <SafeAreaView style={styles.wrapper}>
      <Image
        style={styles.logo}
        source={require("../../assets/owl-bank.png")}
      />
      <Text style={styles.message}>
        Someone's trying to log into your account. Everything look ok? Request
        was sent from {challenge.location} with {challenge.deviceInfo}.
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: "#36D576", ...styles.button }}
        onPress={() => console.log("approved")}
      >
        <Text style={styles.buttonText}>Yes, it's me</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "#F22F46", ...styles.button }}
        onPress={() => console.log("denied")}
      >
        <Text style={styles.buttonText}>No, it's not me</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 200,
    height: 100,
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
    paddingVertical: 50,
    textAlign: "center",
    marginBottom: 100,
  },

  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Challenge;
