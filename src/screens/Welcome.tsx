import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { silentAuthorization } from "../api/verify";

const Welcome = ({ navigation }) => {
  const [spinner, setSpinner] = useState(false);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Spinner
        visible={spinner}
        textContent={"Verifying..."}
        textStyle={styles.spinnerTextStyle}
      />
      <Image
        style={styles.logo}
        source={require("../../assets/owl-bank.png")}
      />
      <TouchableOpacity
        style={{ backgroundColor: "#36D576", ...styles.button }}
        onPress={() => {
          setSpinner(true);

          AsyncStorage.getItem("@factor_sid")
            .then((factorSid) =>
              silentAuthorization(factorSid).then((approved) => {
                setSpinner(false);
                if (approved) {
                  navigation.navigate("Gated");
                }
              })
            )
            .catch((e) => {
              setSpinner(false);
              console.error(e);
              navigation.replace("PhoneNumber");
            });
        }}
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

  spinnerTextStyle: {
    color: "white",
  },
});

export default Welcome;
