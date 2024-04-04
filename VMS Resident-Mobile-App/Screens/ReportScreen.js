import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ReportScreen(props) {
  const [visitorData, setVisitorData] = useState([]);
  const [token, setToken] = useState("");
  const [residentId, setResidentId] = useState("");

  console.log("This is visitorData:", visitorData);

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

  useEffect(() => {
    getResidentId();
  }, []);

  useEffect(() => {
    getToken();
    async function getVisitorData() {
      console.log("Running getResidentData function");
      if (residentId) {
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
    getVisitorData();
  }, [residentId]);

  let visitorCounter = 1;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.visitorContainer}>
          {visitorData.map((visitor, index) => (
            <View
              key={index}
              style={[
                styles.visitorItem,
                {
                  backgroundColor: "#70bbcc",
                  flexDirection: "row",
                  flexWrap: "wrap",
                },
              ]}
            >
              <View
                style={[
                  {
                    // borderWidth: 1,
                    // borderBlockColor: "gray",
                    backgroundColor: "#a8e3d7",
                    padding: 5,
                    borderRadius: 5,
                    height: 35,
                    width: "35%",
                    marginTop: 5,
                    marginLeft: 5,
                  },
                ]}
              >
                <Text style={styles.itemText}>
                  Name: {visitor.name ? visitor.name : "Null"}
                </Text>
              </View>

              <View
                style={[
                  {
                    // borderWidth: 1,
                    // borderBlockColor: "gray",
                    backgroundColor: "#b5a98a",
                    padding: 5,
                    borderRadius: 5,
                    height: 35,
                    width: "59%",
                    marginTop: 5,
                    marginLeft: 10,
                  },
                ]}
              >
                <Text style={styles.itemText}>
                  Invite Date:{" "}
                  {visitor.inviteDate ? visitor.inviteDate : "Null"}
                </Text>
              </View>
              <View
                style={[
                  {
                    // borderWidth: 1,
                    // borderBlockColor: "gray",
                    backgroundColor: "#7e8ca3",
                    padding: 5,
                    borderRadius: 5,
                    height: 35,
                    width: "35%",
                    marginTop: 5,
                    marginLeft: 5,
                  },
                ]}
              >
                <Text style={styles.itemText}>
                  Destination:{" "}
                  {visitor.destination ? visitor.destination : "Null"}
                </Text>
              </View>
              <View
                style={[
                  {
                    // borderWidth: 1,
                    // borderBlockColor: "gray",
                    backgroundColor: "#b79dc4",
                    padding: 5,
                    borderRadius: 5,
                    height: 35,
                    width: "59%",
                    marginTop: 5,
                    marginLeft: 10,
                  },
                ]}
              >
                <Text style={styles.itemText}>
                  Entry Code: {visitor.entryCode ? visitor.entryCode : "Null"}
                </Text>
              </View>
              <View
                style={[
                  {
                    // borderWidth: 1,
                    // borderBlockColor: "gray",
                    backgroundColor: "#5bb035",
                    padding: 5,
                    borderRadius: 5,
                    height: 35,
                    width: "35%",
                    marginTop: 5,
                    marginLeft: 5,
                  },
                ]}
              >
                <Text style={styles.itemText}>
                  Entry Date: {visitor.entryDate}
                </Text>
              </View>
              <View
                style={[
                  {
                    // borderWidth: 1,
                    // borderBlockColor: "gray",
                    backgroundColor: "#c29286",
                    padding: 5,
                    borderRadius: 5,
                    height: 35,
                    width: "59%",
                    marginTop: 5,
                    marginLeft: 10,
                  },
                ]}
              >
                <Text style={styles.itemText}>
                  Entry Time: {visitor.entryTime}
                </Text>
              </View>
              <View
                style={[
                  {
                    // borderWidth: 1,
                    // borderBlockColor: "gray",
                    backgroundColor: "#8f46b0",
                    padding: 5,
                    borderRadius: 5,
                    height: 35,
                    width: "35%",
                    marginTop: 5,
                    marginLeft: 5,
                  },
                ]}
              >
                <Text style={styles.itemText}>
                  Exit Date: {visitor.exitDate}
                </Text>
              </View>

              <View
                style={[
                  {
                    // borderWidth: 1,
                    // borderBlockColor: "gray",
                    backgroundColor: "#f2a0de",
                    padding: 5,
                    borderRadius: 5,
                    height: 35,
                    width: "59%",
                    marginTop: 5,
                    marginLeft: 10,
                  },
                ]}
              >
                <Text style={styles.itemText}>
                  Exit Time: {visitor.exitTime}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  visitorContainer: {
    padding: 10,
  },
  visitorItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  counterText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ReportScreen;
