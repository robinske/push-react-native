import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Image
        style={styles.logo}
        source={require("../../assets/owl-bank.png")}
      />
      <TouchableOpacity
        style={{ backgroundColor: "#36D576", ...styles.button }}
        onPress={() => console.log("TODO - trigger push challenge!")}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "#AEB2C1", ...styles.button }}
        onPress={() => navigation.replace("PhoneNumber")}
      >
        <Text style={styles.buttonText}>Register</Text>
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
    marginBottom: 100,
  },

  prompt: {
    fontSize: 28,
    paddingHorizontal: 30,
    paddingBottom: 20,
    textAlign: "center",
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
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

export default Welcome;
