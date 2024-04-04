import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../Screens/HomeScreen";
import GuestControlScreen from "../Screens/GuestControlScreen";
import ReportScreen from "../Screens/ReportScreen";
import CommitteeScreen from "../Screens/CommitteeScreen";
import ChatScreen from "../Screens/ChatScreen";
import DrawerContent from "./DrawerContent";
import ProfileScreen from "../Screens/ProfileScreen";
import AuthStack from "./AuthStack";
import LoginPage from "../Login&Register/Login";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function DrawerNav() {
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007bff",
        },
        headerTintColor: "#ffffff",
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Guest Invite" component={GuestControlScreen} />
      <Drawer.Screen name="Report" component={ReportScreen} />
      <Drawer.Screen name="Committee" component={CommitteeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen
        options={{ drawerLabel: () => null, drawerLockMode: "locked-closed" }}
        name="Login_1"
        component={AuthStack}
      />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}
