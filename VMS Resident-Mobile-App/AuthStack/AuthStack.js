import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginPage from "../Login&Register/Login";
import RegisterPage from "../Login&Register/Register";
import DrawerNav from "../DrawerStack/DrawerNav";
import HomeScreen from "../Screens/HomeScreen";

export default AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="Homes" component={DrawerNav} />
    </Stack.Navigator>
  );
};
