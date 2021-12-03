import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "react-native";
import PhoneNumber from "./screens/PhoneNumber";
import Otp from "./screens/Otp";
import Gated from "./screens/Gated";

const App = () => {
  type RootParamList = {
    PhoneNumber: undefined;
    Otp: { phoneNumber: string };
    Gated: undefined;
  };

  const Stack = createNativeStackNavigator<RootParamList>();

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="PhoneNumber"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Gated" component={Gated} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
