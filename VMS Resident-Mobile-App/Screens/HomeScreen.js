import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import Mobile from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome5";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Invite from "react-native-vector-icons/MaterialIcons";
import Report from "react-native-vector-icons/MaterialIcons";
import Profile from "react-native-vector-icons/AntDesign";
import Chat from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import axios from "axios";
import Street from "react-native-vector-icons/FontAwesome";
import Estate from "react-native-vector-icons/MaterialCommunityIcons";
import Flat from "react-native-vector-icons/FontAwesome6";

const HomeScreen = () => {
  const [residentNameFetch, setResidentNameFetch] = useState();
  const [userData, setUserData] = useState("");
  const [doneTaskCount, setDoneTaskCount] = useState("");
  const [pendingTaskCount, setPendingTaskCount] = useState("");
  const [suspendedTaskCount, setSuspendedTaskCount] = useState("");
  const [estateName, setEstateName] = useState("");
  const [residentStreet, setResidentStreet] = useState("");
  const [residentFlatNumber, setResidentFlatNumber] = useState("");
  const [residentName, setResidentName] = useState("");
  const [token, setToken] = useState("");

  const navigation = useNavigation();

  console.log("Outside functions, FlatNumber is:", residentFlatNumber);
  console.log("Outside functions, Street Name is:", residentStreet);
  console.log("Outside functions, Resident Name is:", residentName);
  console.log("Outside functions, token is:", token);
  console.log("Outside functions, estate Name is:", estateName);

  const getToken = async () => {
    try {
      const data = await AsyncStorage.getItem("token");
      if (data !== null) {
        console.log("Token inside useEffect is:", data);
        setToken(data);
      }
    } catch (error) {
      console.error("Error retrieving Token from AsyncStorage:", error);
    }
  };

  async function getResidentData() {
    console.log("Running getResidentData function");
    if (token) {
      axios
        .post("http://172.20.10.3:5002/residentData", {
          token: token,
        })
        .then((res) => {
          setResidentStreet(res.data.data.streetName);
          setResidentFlatNumber(res.data.data.flatNumber);
          setResidentName(res.data.data.name);
        })
        .catch((error) => console.log(error));
    } else {
      console.log(
        "Could not perform axios get request on getResidentData function"
      );
    }
  }

  async function getEstateName() {
    axios.get("http://172.20.10.3:5003/getAdminData").then((res) => {
      const estName = res.data[0];
      console.log("Estate Name:", estName.estateName);
      setEstateName(estName.estateName);
    });
  }

  useEffect(() => {
    getToken();
    getResidentData();
    getEstateName();
  }, [token]);

  return (
    <SafeAreaView style={[{ backgroundColor: "#65A7F5" }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View
            style={{
              //   justifyContent: "center",
              //   alignItems: "center",
              marginTop: 50,
              marginLeft: 15,
              marginRight: 15,
              flexDirection: "row",
              gap: 20,
              backgroundColor: "#7b4dd6",
              width: 385,
              paddingLeft: 2,
              paddingTop: 2,
              paddingBottom: 2,
              paddingRight: 2,
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../assets/visitor.png")}
            />
            {/* <Image
              style={styles.tinyLogo}
              source={require("../assets/visitor1.jfif")}
            /> */}
            {/* <Image
              style={styles.tinyLogo}
              source={require("../assets/hero3.jpg")}
            /> */}
          </View>
          <View style={styles.welcome}>
            <Text style={styles.welcome}>Welcome {residentName}</Text>
          </View>

          <View style={{ marginTop: 60, marginHorizontal: 25 }}>
            <View style={styles.infoMain}>
              <View style={styles.infoCont}>
                <View
                  style={[styles.infoIconCont, { backgroundColor: "#fff" }]}
                >
                  <Estate
                    name="sign-real-estate"
                    size={24}
                    style={{ color: "green" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Estate</Text>
                  <Text style={styles.infoLarge_Text} numberOfLines={1}>
                    {estateName}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.infoMain}>
              <View style={styles.infoCont}>
                <View
                  style={[styles.infoIconCont, { backgroundColor: "white" }]}
                >
                  <Street
                    name="street-view"
                    size={24}
                    style={{ color: "#bf955e" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Street</Text>
                  <Text style={styles.infoLarge_Text} numberOfLines={1}>
                    {residentStreet}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.infoMain}>
              <View style={styles.infoCont}>
                <View
                  style={[styles.infoIconCont, { backgroundColor: "white" }]}
                >
                  <Flat
                    name="house-chimney-user"
                    size={24}
                    style={{ color: "orange" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Flat Number</Text>
                  <Text style={styles.infoLarge_Text} numberOfLines={1}>
                    {residentFlatNumber}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bottomButton}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity style={styles.inBut2}>
                <Invite
                  name="insert-invitation"
                  color="white"
                  style={styles.smallIcon2}
                  onPress={() => {
                    navigation.navigate("Guest Invite");
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Guest Invite</Text>
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
                  navigation.navigate("Report");
                }}
              >
                <Report
                  name="report-gmailerrorred"
                  color="white"
                  style={[styles.smallIcon2, { fontSize: 30 }]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Report</Text>
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
                  navigation.navigate("Profile");
                }}
              >
                <Profile
                  name="profile"
                  color="white"
                  style={[styles.smallIcon2, { fontSize: 30 }]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Profile</Text>
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
                  navigation.navigate("Chat");
                }}
              >
                <Chat
                  name="chatbox-ellipses-outline"
                  color="white"
                  style={[styles.smallIcon2, { fontSize: 30 }]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Chat</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#65A7F5",
    height: 1000,
  },
  welcome: {
    color: "#fff",
    fontSize: 23,
    marginTop: 10,
    marginLeft: 35,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  tinyLogo: {
    width: 381,
    height: 120,
  },
  editIcon: {
    zIndex: 1,
    color: "white",
    position: "absolute",
    right: 2,
    margin: 20,
  },
  backIcon: {
    zIndex: 1,
    color: "white",
    position: "absolute",
    left: 2,
    margin: 15,
  },
  button: {
    alignItems: "center",
    marginTop: -20,
    alignItems: "center",
    textAlign: "center",
    margin: 20,
  },
  inBut: {
    width: "70%",
    backgroundColor: "#00425F",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  inBut2: {
    // backgroundColor: "#00425F",
    backgroundColor: "#7b4dd6",
    height: 65,
    width: 65,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 100,
  },
  smallIcon2: {
    fontSize: 40,
  },
  bottomText: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },
  taskBox: {
    marginTop: 40,
    flexDirection: "row",
    gap: 10,
    paddingLeft: 15,
    height: 150,
  },

  infoCont: {
    width: "100%",
    flexDirection: "row",
  },
  infoIconCont: {
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    elevation: -5,
    borderColor: "black",
    backgroundColor: "black",
  },

  infoText: {
    width: "80%",
    flexDirection: "column",
    marginLeft: 25,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#e6e6e6",
  },
  infoSmall_Text: {
    fontSize: 13,
    color: "#7b4dd6",
    fontWeight: "500",
  },
  infoLarge_Text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HomeScreen;
