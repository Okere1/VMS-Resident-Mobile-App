import AuthStack from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";

export default function Root() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
