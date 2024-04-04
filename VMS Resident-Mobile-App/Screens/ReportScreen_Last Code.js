import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  BackHandler,
  Alert,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Mark from "react-native-vector-icons/AntDesign";
import Closequare from "react-native-vector-icons/AntDesign";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Mobile from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome5";

function ReportScreen(props) {
  const navigation = useNavigation();

  const [estateName, setEstateName] = useState("");
  const [name, setName] = useState("");
  const [inviteDate, setInviteDate] = useState("");
  const [inviteTime, setInviteTime] = useState("");
  const [destination, setDestination] = useState("");
  const [entryCode, setEntryCode] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [residentStreet, setResidentStreet] = useState("");
  const [residentFlatNumber, setResidentFlatNumber] = useState("");
  const [residentName, setResidentName] = useState("");
  const [token, setToken] = useState("");
  const [residentId, setResidentId] = useState("");
  const [visitorData, setVisitorData] = useState([]);

  console.log(visitorData);

  const handleBackPress = () => {
    Alert.alert("Exit App", "Are you sure you want to exit", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Exit",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    })
  );

  // console.log("Outside functions, FlatNumber is:", residentFlatNumber);
  // console.log("Outside functions, Street Name is:", residentStreet);
  // console.log("Outside functions, Resident Name is:", residentName);
  // console.log("Outside functions, token is:", token);
  // console.log("Outside functions, estate Name is:", estateName);

  console.log("Outside functions Report Page, token is:", token);
  console.log("Outside functions Report Page, FlatNumber is:", name);
  console.log("Outside functions Report Page, Street Name is:", inviteDate);
  console.log("Outside functions Report Page, Resident Name is:", inviteTime);
  console.log("Outside functions Report Page, estate Name is:", destination);
  console.log("Outside functions Report Page, estate Name is:", entryCode);

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

  const getResidentId = async () => {
    console.log("ResidentID funciton has been called");

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

  async function getVisitorData() {
    console.log("Running getResidentData function");
    if (token) {
      axios
        .post("http://172.20.10.3:5002/visitorData", {
          residentId: residentId,
        })
        .then((res) => {
          setVisitorData(res.data.data);
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
    getVisitorData();
    getToken();
    getResidentId();
    getEstateName();
  }, [token, name]);

  return (
    <SafeAreaView style={[{ backgroundColor: "#65A7F5" }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[{ marginTop: 0, backgroundColor: "#65A7F5", height: 1000 }]}
        >
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 9,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {visitorData.map((visitor, index) => (
              <View
                key={index}
                style={[
                  styles.infoMain,
                  {
                    borderWidth: 1,
                    borderBlockColor: "gray",
                    backgroundColor: "#D5F5E3",
                    padding: 5,
                    borderRadius: 10,
                  },
                ]}
              >
                <View style={styles.infoCont}>
                  <View
                    style={[styles.infoIconCont, { backgroundColor: "green" }]}
                  >
                    <Mark
                      name="checksquare"
                      size={14}
                      style={{ color: "white" }}
                    />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={styles.infoSmall_Text}>Name</Text>
                    <Text style={[{ fontSize: 15 }]}>{visitor.name}</Text>
                  </View>
                </View>
              </View>
            ))}

            <View
              style={[
                styles.infoMain,
                {
                  borderWidth: 1,
                  borderBlockColor: "gray",
                  backgroundColor: "#D5F5E3",
                  padding: 5,
                  borderRadius: 10,
                },
              ]}
            >
              <View style={styles.infoCont}>
                <View
                  style={[styles.infoIconCont, { backgroundColor: "green" }]}
                >
                  <Mark
                    name="checksquare"
                    size={14}
                    style={{ color: "white" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Invite Date</Text>
                  <Text style={[{ fontSize: 15 }]}>
                    {visitorData.inviteDate}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.infoMain,
                {
                  borderWidth: 1,
                  borderBlockColor: "gray",
                  backgroundColor: "#FEF9E7",
                  padding: 5,
                  borderRadius: 10,
                },
              ]}
            >
              <View style={styles.infoCont}>
                <View
                  style={[styles.infoIconCont, { backgroundColor: "#AF601A" }]}
                >
                  <Closequare
                    name="leftcircleo"
                    size={14}
                    style={{ color: "white" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Entry Code</Text>
                  <Text style={[{ fontSize: 15 }]}>{entryCode}</Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.infoMain,
                {
                  borderWidth: 1,
                  borderBlockColor: "gray",
                  backgroundColor: "#FCF3CF",
                  padding: 5,
                  borderRadius: 10,
                },
              ]}
            >
              <View style={styles.infoCont}>
                <View style={[styles.infoIconCont, { backgroundColor: "red" }]}>
                  <Closequare
                    name="closesquare"
                    size={14}
                    style={{ color: "white" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Entry Date</Text>
                  <Text style={[{ fontSize: 15 }]}>
                    {entryDate ? entryDate : "Null"}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.infoMain,
                {
                  borderWidth: 1,
                  borderBlockColor: "gray",
                  backgroundColor: "#FCF3CF",
                  padding: 5,
                  borderRadius: 10,
                },
              ]}
            >
              <View style={styles.infoCont}>
                <View style={[styles.infoIconCont, { backgroundColor: "red" }]}>
                  <Closequare
                    name="closesquare"
                    size={14}
                    style={{ color: "white" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Entry Time</Text>
                  <Text style={[{ fontSize: 15 }]}>
                    {entryTime ? entryTime : "Null"}
                  </Text>
                  {/* <Text style={styles.infoLarge_Text} numberOfLines={1}></Text> */}
                </View>
              </View>
            </View>
            <View
              style={[
                styles.infoMain,
                {
                  borderWidth: 1,
                  borderBlockColor: "gray",
                  backgroundColor: "#FCF3CF",
                  padding: 5,
                  borderRadius: 10,
                },
              ]}
            >
              <View style={styles.infoCont}>
                <View style={[styles.infoIconCont, { backgroundColor: "red" }]}>
                  <Closequare
                    name="closesquare"
                    size={14}
                    style={{ color: "white" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Exit Date</Text>
                  <Text style={[{ fontSize: 15 }]}>
                    {exitDate ? exitDate : "Null"}
                  </Text>
                  {/* <Text style={styles.infoLarge_Text} numberOfLines={1}></Text> */}
                </View>
              </View>
            </View>

            <View
              style={[
                styles.infoMain,
                {
                  borderWidth: 1,
                  borderBlockColor: "gray",
                  backgroundColor: "#FCF3CF",
                  padding: 5,
                  borderRadius: 10,
                },
              ]}
            >
              <View style={styles.infoCont}>
                <View style={[styles.infoIconCont, { backgroundColor: "red" }]}>
                  <Closequare
                    name="closesquare"
                    size={14}
                    style={{ color: "white" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Exit Time</Text>
                  <Text style={[{ fontSize: 15 }]}>
                    {exitTime ? exitTime : "Null"}
                  </Text>
                  {/* <Text style={styles.infoLarge_Text} numberOfLines={1}></Text> */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  infoMain: {
    marginTop: 2,
    height: 45,
    width: "50%",
  },
  infoCont: {
    width: "100%",
    height: 40,
    flexDirection: "row",
  },
  infoIconCont: {
    justifyContent: "center",
    height: 25,
    width: 25,
    borderRadius: 15,
    alignItems: "center",
    elevation: -5,
    borderColor: "black",
    backgroundColor: "black",
  },

  infoText: {
    width: "80%",
    height: 35,
    flexDirection: "column",
    marginLeft: 10,
    borderBottomWidth: 1,
    paddingBottom: 0,
    borderColor: "#488764",
  },
  infoSmall_Text: {
    fontSize: 15,
    color: "#b3b3b3",
    fontWeight: "500",
  },
  infoLarge_Text: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
});
export default ReportScreen;
