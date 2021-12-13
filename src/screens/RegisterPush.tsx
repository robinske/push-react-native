import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { createFactor } from "../api/verify";

const RegisterPush = ({ route, navigation }) => {
  const [spinner, setSpinner] = useState(false);
  const { phoneNumber } = route.params;
  return (
    <SafeAreaView style={styles.wrapper}>
      <Spinner
        visible={spinner}
        textContent={"One moment..."}
        textStyle={styles.spinnerTextStyle}
      />
      <Text style={styles.prompt}>Secure your account with this device?</Text>
      <Text style={styles.message}>
        {`Whenever there's a new login, we'll send a notification to this phone. It's safer than a text message and you can instantly approve or deny access.`}
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: "#36D576", ...styles.button }}
        onPress={() => {
          setSpinner(true);
          createFactor(phoneNumber)
            .then(() => {
              setSpinner(false);
              navigation.navigate("Gated");
            })
            .catch((e) => {
              console.error(e);
            });
        }}
      >
        <Text style={styles.buttonText}>Yes, use this device</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "#AEB2C1", ...styles.button }}
        onPress={() => console.log("skipping push registration")}
      >
        <Text style={styles.buttonText}>Not now</Text>
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

  spinnerTextStyle: {
    color: "#FFFFFF",
  },
});

export default RegisterPush;
