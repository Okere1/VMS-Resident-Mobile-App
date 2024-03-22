import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  CheckBox,
  TouchableOpacity,
} from "react-native";

const GuestControlScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [communicationOptions, setCommunicationOptions] = useState({
    whatsapp: false,
    email: false,
    sms: false,
  });

  const generateRandomToken = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    setToken(randomNumber.toString());
  };

  const handleSend = () => {
    // Construct message with token and other text
    const fullMessage = `${message} Your access token is: ${token}`;

    // Implement logic to send message based on selected communication options
    if (communicationOptions.email) {
      // Send email
    }
    if (communicationOptions.sms) {
      // Open SMS app
    }
    if (communicationOptions.whatsapp) {
      // Open WhatsApp app
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <Text>Pick Communication Option</Text>
      <CheckBox
        value={communicationOptions.whatsapp}
        onValueChange={() =>
          setCommunicationOptions({
            ...communicationOptions,
            whatsapp: !communicationOptions.whatsapp,
          })
        }
      />
      <Text>WhatsApp</Text>
      <CheckBox
        value={communicationOptions.email}
        onValueChange={() =>
          setCommunicationOptions({
            ...communicationOptions,
            email: !communicationOptions.email,
          })
        }
      />
      <Text>Email</Text>
      <CheckBox
        value={communicationOptions.sms}
        onValueChange={() =>
          setCommunicationOptions({
            ...communicationOptions,
            sms: !communicationOptions.sms,
          })
        }
      />
      <Text>SMS</Text>
      <TextInput
        placeholder="Generated Access Token"
        value={token}
        onChangeText={(text) => setToken(text)}
        editable={false}
      />
      <TouchableOpacity onPress={generateRandomToken}>
        <Text>Generate Token</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={(text) => setMessage(text)}
        multiline
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

export default GuestControlScreen;
