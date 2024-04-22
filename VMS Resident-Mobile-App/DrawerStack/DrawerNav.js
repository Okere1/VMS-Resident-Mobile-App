import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../Screens/HomeScreen.js";
import GuestControlScreen from "../Screens/GuestControlScreen.js";
import ReportScreen from "../Screens/ReportScreen.js";
import CommitteeScreen from "../Screens/CommitteeScreen.js";
import ChatScreen from "../Screens/ChatScreen.js";
import DrawerContent from "./DrawerContent.js";
import ProfileScreen from "../Screens/ProfileScreen.js";
// import AuthStack from "../AuthStack/AuthStack.js";
// import LoginPage from "../Login&Register/Login.jsx";
// import SignOutScreen from "../Screens/SignOutScreen.js";
import StackNav from "../StackNav/StackNav.js";
import LoginPage from "../Login&Register/Login.jsx";
import AuthenticatedStack from "../AuthStack/AuthenticatedStack.js";
import AuthStack from "../AuthStack/AuthStack.js";
// import AuthStack from "../AuthStack/AuthStack.js";
// import LoginPage from "../Login&Register/Login.jsx";
import { AuthContext } from "../store/auth-context";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function DrawerNav() {
  const authCtx = React.useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={{
        // headerShown: false,
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
    </Drawer.Navigator>
  );
}
