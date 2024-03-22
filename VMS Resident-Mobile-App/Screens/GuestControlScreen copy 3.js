import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

const InviteGuestForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [communicationOption, setCommunicationOption] = useState(null);

  const generateRandomToken = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    setToken(randomNumber.toString());
  };

  const handleSend = () => {
    // Construct message with token and other text
    const fullMessage = `${message} Your access token is: ${token}`;

    // Implement logic to send message based on selected communication option
    if (communicationOption === "email") {
      // Send email
    } else if (communicationOption === "sms") {
      // Open SMS app
    } else if (communicationOption === "whatsapp") {
      // Open WhatsApp app
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text style={[styles.inputLabel, { marginTop: 15 }]}>
              Phone Number
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              keyboardType="numeric"
            />
            <Text style={[styles.inputLabel, { marginTop: 15 }]}>
              Email Address
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
            <Text style={[styles.inputLabel, { marginTop: 15 }]}>
              Pick Communication Option
            </Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  communicationOption === "whatsapp" &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => setCommunicationOption("whatsapp")}
              >
                <Text style={styles.radioText}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  communicationOption === "email" && styles.radioButtonSelected,
                ]}
                onPress={() => setCommunicationOption("email")}
              >
                <Text style={styles.radioText}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  communicationOption === "sms" && styles.radioButtonSelected,
                ]}
                onPress={() => setCommunicationOption("sms")}
              >
                <Text style={styles.radioText}>SMS</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.input, styles.tokenInput]}
              placeholder="Generated Access Token"
              value={token}
              onChangeText={(text) => setToken(text)}
              editable={false}
            />
            <TouchableOpacity
              style={styles.generateButton}
              onPress={generateRandomToken}
            >
              <Text style={styles.generateButtonText}>Generate Token</Text>
            </TouchableOpacity>
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Message"
              value={message}
              onChangeText={(text) => setMessage(text)}
              multiline
            />
            <Button title="Send" onPress={handleSend} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  scrollView: {
    marginHorizontal: 2,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 15,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  radioButtonSelected: {
    backgroundColor: "lightgray",
  },
  radioText: {
    fontSize: 16,
  },
  tokenInput: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    color: "black",
  },
  generateButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  generateButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  messageInput: {
    height: 100,
  },
});

export default InviteGuestForm;
