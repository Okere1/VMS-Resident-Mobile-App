import AuthStack from "../AuthStack/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DrawerNav from "../DrawerStack/DrawerNav";
import { View } from "react-native";

export default function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    console.log(data);
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NavigationContainer>
        {isLoggedIn ? <DrawerNav /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}
