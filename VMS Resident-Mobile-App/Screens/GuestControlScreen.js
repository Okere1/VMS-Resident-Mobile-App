import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InviteDate from "../Components/InviteDate";
import InviteTime from "../Components/InviteTime";

const InviteGuestForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [inviteDate, setInviteDate] = useState("");
  const [inviteTime, setInviteTime] = useState("");
  const [entryCode, setEntryCode] = useState("");
  const [estateName, setEstateName] = useState("");
  const [residentId, setResidentId] = useState("");
  const [message, setMessage] = useState("");
  const [communicationOption, setCommunicationOption] = useState(null);

  console.log("Communucation option is:", communicationOption);
  const generateRandomToken = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    setEntryCode(randomNumber.toString());
    setMessage(
      `Hi ${name}, You are invited to the ${estateName}, Building ${destination}.\n\nYour Entry Code is ${randomNumber}, Please ensure not to share this code with anyone, thank you.`
    );
  };

  // Dont forget that the API called here is that of the Super Admin (To access the Admins Estate Name)
  async function getEstateName() {
    axios.get("http://172.20.10.3:5003/getAdminData").then((res) => {
      const estName = res.data[0];
      console.log("Estate Name:", estName.estateName);
      setEstateName(estName.estateName);
    });
  }

  const getResidentId = async () => {
    try {
      const data = await AsyncStorage.getItem("residentId");
      if (data !== null) {
        // const parsedData = JSON.parse(data);
        console.log("residentId Inside useEffect function:", data);
        setResidentId(data);
      }
    } catch (error) {
      console.error("Error retrieving residentId from AsyncStorage:", error);
    }
  };

  console.log("Resident ID in Guest Control Page is:", residentId);

  const visitorData = {
    name: name,
    inviteDate: inviteDate,
    inviteTime: inviteTime,
    destination: destination,
    entryCode: entryCode,
    residentId: residentId,
  };

  function sendVistorData() {
    console.log("Sending Visitor Invite Data");
    axios
      .post("http://172.20.10.3:5002/inviteVisitor", visitorData)
      .then((res) => {
        if (res.data.status == "ok") {
          console.log("Vistors data successfully sent to DB");
          setName("");
          setInviteDate("");
          setInviteTime("");
          setDestination("");
          setEntryCode("");
          setMessage("");
          setCommunicationOption(null);
        }
      })
      .catch((error) => console.log(error));
  }

  const openWhatsApp = () => {
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("WhatsApp is not installed on your device.");
    });
  };

  const openEmail = () => {
    const url = `mailto:${email}?subject=Invitation&body=${encodeURIComponent(
      message
    )}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("No email app is installed on your device.");
    });
  };

  const openSMS = () => {
    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("No SMS app is installed on your device.");
    });
  };

  const handleSend = () => {
    // Construct message with token and other text
    const fullMessage = `${message} Your access token is: ${entryCode}`;
    console.log("handleSend Function has been called");
    // Implement logic to send message based on selected communication option
    if (communicationOption === "email") {
      // Send email
      openEmail();
      sendVistorData();
    } else if (communicationOption === "sms") {
      // Open SMS app
      openSMS();
      sendVistorData();
    } else if (communicationOption === "whatsapp") {
      // Open WhatsApp app
      openWhatsApp();
      sendVistorData();
    }
  };

  useEffect(() => {
    getEstateName();
    getResidentId();
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View
              style={[
                { backgroundColor: "#349fd9", padding: 25, borderRadius: 10 },
              ]}
            >
              <Text style={styles.inputLabel}>Visitor's Name</Text>

              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="lightgray"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <Text style={[styles.inputLabel, { marginTop: 15 }]}>
                Estate Flat Number (destination)
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Building Number"
                placeholderTextColor="lightgray"
                value={destination}
                onChangeText={(text) => setDestination(text)}
                keyboardType="numeric"
              />

              <Text style={[styles.inputLabel, { marginTop: 15 }]}>
                Invite Date
              </Text>
              <InviteDate
                inviteDate={inviteDate}
                setInviteDate={setInviteDate}
              />

              <Text style={[styles.inputLabel, { marginTop: 15 }]}>
                Invite Time
              </Text>
              <InviteTime
                inviteTime={inviteTime}
                setInviteTime={setInviteTime}
              />
              {/* <TextInput
                style={styles.input}
                placeholder="Enter email address"
                placeholderTextColor="lightgray"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
              /> */}
            </View>
            <Text
              style={[styles.inputLabel, { marginTop: 15, color: "#979a9c" }]}
            >
              Pick Communication Option
            </Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  { backgroundColor: "#ac79b3" },
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
                  { backgroundColor: "#4b9c54" },
                  communicationOption === "email" && styles.radioButtonSelected,
                ]}
                onPress={() => setCommunicationOption("email")}
              >
                <Text style={[styles.radioText, { width: 75 }]}>Email </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  { backgroundColor: "#03fce3" },
                  communicationOption === "sms" && styles.radioButtonSelected,
                ]}
                onPress={() => setCommunicationOption("sms")}
              >
                <Text style={[styles.radioText, { width: 70 }]}>SMS</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                { backgroundColor: "#37ab7e", padding: 10, borderRadius: 10 },
              ]}
            >
              <TextInput
                style={[
                  styles.input,
                  styles.tokenInput,
                  { backgroundColor: "#dae8e2" },
                ]}
                placeholder="Generated Access Token"
                value={entryCode}
                onChangeText={(text) => setEntryCode(text)}
                editable={false}
              />
              <TouchableOpacity
                style={[styles.generateButton, { backgroundColor: "#247351" }]}
                onPress={generateRandomToken}
              >
                <Text style={[styles.generateButtonText, { color: "white" }]}>
                  Generate Entry Code
                </Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Message"
                value={message}
                onChangeText={(text) => setMessage(text)}
                multiline
              />
            </View>
            <TouchableOpacity
              style={[
                {
                  // backgroundColor: "#247351",
                  backgroundColor: "#2c5a82",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  marginTop: 10,
                },
              ]}
              onPress={handleSend}
            >
              <Text style={[styles.generateButtonText, { color: "white" }]}>
                SEND
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: -5,
  },
  input: {
    height: 40,
    borderColor: "lightgray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#404744",
    backgroundColor: "#e9f0f0",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 15,
    marginBottom: 5,
    color: "white",
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
    color: "#247351",
  },
});

export default InviteGuestForm;
