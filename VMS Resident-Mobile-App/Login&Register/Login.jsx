import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import styles from "../Styles/LoginStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../store/auth-context";

function LoginPage() {
  const [residentEmail, setResidentEmail] = useState("");
  const [residentPassword, setResidentPassword] = useState("");
  const authContext = useContext(AuthContext)
  const navigation = useNavigation();

  function handleSubmit() {
    // console.log(email, password);
    const userData = {
      residentEmail: residentEmail,
      residentPassword,
    };

    axios
      .post("https://vms-admin-backend.onrender.com/residentLogin", userData)
      .then((res) => {
        // console.log(res.data);
        if (res.data.status == "ok") {
          Alert.alert("Login Successful");
          AsyncStorage.setItem("token", res.data.data); // storing the backend created token save in the data property in the Asyncstorage variable to be access on any file
          AsyncStorage.setItem("isLoggedIn", "loggedIn");
          
          const token = res.data.data;
          authContext.authenticate(token);
          console.log("Token is:", token);
          
          axios
            .post("https://vms-admin-backend.onrender.com/residentData", {
              token: token,
            })
            .then((res) => {
              console.log("Resident Name from Login is:", res.data.data.name);
              console.log(
                "Resident Estate ID from Login is:",
                res.data.data.residentId
              );
              AsyncStorage.setItem("residentName", res.data.data.name);
              AsyncStorage.setItem("residentId", res.data.data.residentId);
            })
            .catch((error) => console.log(error));
          // navigation.navigate("DrawerNav");
        } else {
          Alert.alert(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={"always"}
    >
      <View style={styles.loginContainer}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/isw12.png")} />
        </View>
        <Text style={styles.text_header}>Login</Text>

        <View style={styles.action}>
          <FontAwesome name="user-o" color="#00425F" style={styles.smallIcon} />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChange={(e) => setResidentEmail(e.nativeEvent.text)}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="lock" color="#00425F" style={styles.smallIcon} />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            onChange={(e) => setResidentPassword(e.nativeEvent.text)}
            secureTextEntry={true}
          />
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginTop: 8,
            marginRight: 10,
          }}
        >
          <Text style={{ color: "#00425F", fontWeight: "700" }}>
            Forgot Password
          </Text>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
          <Text style={styles.textSign}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 15 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#919191",
            marginLeft: 110,
            marginTop: 70,
          }}
        >
          ----Or Continue as----
        </Text>
      </View>

      <View style={styles.bottomButton}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={styles.inBut2}>
            <FontAwesome
              name="user-circle-o"
              color="white"
              style={styles.smallIcon2}
              onPress={() => alert("Coming Soon")}
            />
          </TouchableOpacity>
          <Text style={styles.bottomText}>Guest</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.inBut2}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <FontAwesome
              name="user-plus"
              color="white"
              style={[styles.smallIcon2, { fontSize: 30 }]}
            />
          </TouchableOpacity>
          <Text style={styles.bottomText}>Sign Up</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.inBut2}
            onPress={() => alert("Coming Soon")}
          >
            <FontAwesome
              name="google"
              color="white"
              style={[styles.smallIcon2, { fontSize: 30 }]}
            />
          </TouchableOpacity>
          <Text style={styles.bottomText}>Google</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.inBut2}
            onPress={() => alert("Coming Soon")}
          >
            <FontAwesome
              name="facebook-f"
              color="white"
              style={[styles.smallIcon2, { fontSize: 30 }]}
            />
          </TouchableOpacity>
          <Text style={styles.bottomText}>Facebook</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default LoginPage;
