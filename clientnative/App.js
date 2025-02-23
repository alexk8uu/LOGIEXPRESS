import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SingIn from "./Components/SingIn";
import SingUp from "./Components/SingUp";
import ProfileScreen from "./Components/ProfileScreen"

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="singIn"
          component={SingIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="singUp" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
