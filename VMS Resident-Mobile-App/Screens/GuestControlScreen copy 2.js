import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function GuestControlScreen() {
  const [isChecked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [communicationOptions, setCommunicationOptions] = useState({
    email: false,
    whatsapp: false,
    sms: false,
  });

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
        />
        <Text style={styles.paragraph}>Normal checkbox</Text>
      </View>
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={communicationOptions.email}
          onValueChange={() =>
            setCommunicationOptions({
              ...communicationOptions,
              email: !communicationOptions.email,
            })
          }
          color={communicationOptions.email ? "#4630EB" : "#088F8F"}
        />
        <Text style={styles.paragraph}>Email</Text>
      </View>
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={communicationOptions.whatsapp}
          onValueChange={() =>
            setCommunicationOptions({
              ...communicationOptions,
              whatsapp: !communicationOptions.whatsapp,
            })
          }
          color={communicationOptions.whatsapp ? "#4630EB" : "#088F8F"}
        />
        <Text style={styles.paragraph}>WhatsApp</Text>
      </View>
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={communicationOptions.sms}
          onValueChange={() =>
            setCommunicationOptions({
              ...communicationOptions,
              sms: !communicationOptions.sms,
            })
          }
          color={communicationOptions.sms ? "#4630EB" : "#088F8F"}
        />
        <Text style={styles.paragraph}>SMS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
