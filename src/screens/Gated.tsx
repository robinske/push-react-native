import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";

const Gated = ({ navigation }) => {
  const image = require("../../assets/banking.png");
  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.image} source={image} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Welcome")}
      >
        <Text style={styles.buttonText}>🎉 click to start over</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "200%",
  },

  button: {
    height: "100%",
    justifyContent: "center",
  },

  buttonText: {
    padding: 20,
    textAlign: "center",
    fontSize: 24,
    backgroundColor: "#ad1111",
    color: "white",
  },
});

export default Gated;
