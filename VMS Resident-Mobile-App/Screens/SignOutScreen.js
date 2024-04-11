// SignOutScreen.js
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignOutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Perform sign-out logic here, such as clearing user session, etc.
    // After sign-out, navigate the user back to the login screen
    navigation.navigate("Root");
  }, []);

  return (
    <View>
      <Text>Signing Out...</Text>
      {/* Optionally, you can display a message or spinner while signing out */}
    </View>
  );
};

export default SignOutScreen;
