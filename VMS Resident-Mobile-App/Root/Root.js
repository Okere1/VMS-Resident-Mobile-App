import AuthStack from "../AuthStack/AuthStack";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DrawerNav from "../DrawerStack/DrawerNav";
import { View } from "react-native";
import AuthenticatedStack from "../AuthStack/AuthenticatedStack";
import { AuthContext } from "../store/auth-context";

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <DrawerNav />}
    </NavigationContainer>
  );
}

export default function Root() {

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
    }

    getToken();
  }, []);

  return <Navigation />;
}
