import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNav from "../DrawerStack/DrawerNav";

const Stack = createNativeStackNavigator();
export default function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DrawerNav" component={DrawerNav} />
    </Stack.Navigator>
  );
}
