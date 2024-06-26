import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import InviteGuestForm from "../Screens/GuestControlScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import ReportScreen from "../Screens/ReportScreen";
import CommitteeScreen from "../Screens/CommitteeScreen";
import ChatScreen from "../Screens/ChatScreen";

export default StackNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007bff",
        },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Guest Invite" component={InviteGuestForm} />
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="Committee" component={CommitteeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      {/* <Stack.Screen
        name="LoginUsers"
        component={LoginPage}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};
