import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignOutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate("Root");
  }, []);

  return (
    <View>
      <Text>Signing Out...</Text>
    </View>
  );
};

export default SignOutScreen;
