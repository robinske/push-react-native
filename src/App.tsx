import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PhoneNumber from "./screens/PhoneNumber";
import Otp from "./screens/Otp";
import RegisterPush from "./screens/RegisterPush";
import Gated from "./screens/Gated";
import Welcome from "./screens/Welcome";

const App = () => {
  type StackParamList = {
    PhoneNumber: undefined;
    Otp: { phoneNumber: string };
    RegisterPush: { phoneNumber: string };
    Gated: undefined;
    Welcome: undefined;
  };

  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="RegisterPush" component={RegisterPush} />
        <Stack.Screen name="Gated" component={Gated} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
