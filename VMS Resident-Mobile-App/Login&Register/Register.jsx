import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import styles from "../Styles/LoginStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Location from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Error from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
// import RNPickerSelect from "react-native-picker-select";
// import pickerSelectStyles from "../Styles/RNStyle_Register";

function RegisterPage() {
  [residentEmail, setResidentEmail] = useState("");
  [emailVerify, setEmailVerify] = useState(false);
  [residentPassword, setResidentPassword] = useState("");
  [passwordVerify, setPasswordVerify] = useState(false);
  [showPassword, setShowPassword] = useState(true);
  [accessCode, setAccessCode] = useState("");

  const navigation = useNavigation();
  function handleSubmit() {
    const userData = {
      accessCode,
      residentEmail,
      residentPassword,
    };

    if (emailVerify && passwordVerify) {
      axios
        .post(
          "https://vms-admin-backend.onrender.com/residentRegister",
          userData
        )
        .then((res) => {
          // console.log(res.data);
          if (res.data.status == "ok") {
            Alert.alert("Registered Successfull!!");
            console.log("Registration Successfull");
            navigation.navigate("Login");
          }
          if (res.data.data == "not-onboarded") {
            Alert.alert("User has not been onboarded!!");
            console.log("User has not been onboarded");
          }
          if (res.data.data == "invalid") {
            Alert.alert("Invalid Access code!!");
            console.log("Invalid Access Code");
          }
        })
        .catch((e) => console.log(e));
    } else {
      Alert.alert("Fill mandatory details");
    }
  }

  function handleResidentAccessCode(e) {
    const residentAccessCodeVar = e.nativeEvent.text;
    setAccessCode(residentAccessCodeVar);
  }

  function handleResidentEmail(e) {
    const residentEmailVar = e.nativeEvent.text;
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(residentEmailVar)) {
      setResidentEmail(residentEmailVar);
      setEmailVerify(true);
    }
  }

  function handleResidentPassword(e) {
    const residentPasswordVar = e.nativeEvent.text;
    setResidentPassword(residentPasswordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(residentPasswordVar)) {
      setResidentPassword(residentPasswordVar);
      setPasswordVerify(true);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View>
          <View style={styles.loginContainer}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("../assets/isw12.png")}
              />
            </View>
            <Text style={styles.text_header}>Register</Text>

            <View style={styles.action}>
              <Fontisto
                name="email"
                color="#00425F"
                size={24}
                style={{ marginLeft: 0, paddingRight: 5 }}
              />
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                onChange={(e) => handleResidentEmail(e)}
              />
              {residentEmail.length < 1 ? null : emailVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Error name="error" color="red" size={20} />
              )}
            </View>
            {residentEmail.length < 1 ? null : emailVerify ? null : (
              <Text
                style={{
                  marginLeft: 20,
                  color: "red",
                }}
              >
                Enter Proper Email Address
              </Text>
            )}

            <View style={styles.action}>
              <FontAwesome
                name="lock"
                color="#00425F"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                onChange={(e) => handleResidentPassword(e)}
                secureTextEntry={showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {residentPassword.length < 1 ? null : !showPassword ? (
                  <Feather
                    name="eye"
                    color={passwordVerify ? "green" : "red"}
                    size={18}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    color={passwordVerify ? "green" : "red"}
                    size={18}
                  />
                )}
              </TouchableOpacity>
            </View>
            {residentPassword.length < 1 ? null : passwordVerify ? null : (
              <Text
                style={{
                  marginLeft: 20,
                  color: "red",
                }}
              >
                Enter Proper Phone Number
              </Text>
            )}

            <View style={styles.action}>
              <FontAwesome5
                name="key"
                color="#00425F"
                size={20}
                style={{ marginTop: -7, marginLeft: -3, paddingRight: 8 }}
              />
              <TextInput
                placeholder="Enter Registration Code"
                style={styles.textInput}
                value={accessCode}
                onChange={(e) => handleResidentAccessCode(e)}
                maxLength={4}
                keyboardType="numeric"
                required
              />
            </View>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={[styles.inBut, { marginTop: 30 }]}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.textSign}>Register </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterPage;
