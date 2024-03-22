import * as React from "react";
import { Button, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Guest Control")}
        title="Go to Guest Control"
      />
    </View>
  );
}
