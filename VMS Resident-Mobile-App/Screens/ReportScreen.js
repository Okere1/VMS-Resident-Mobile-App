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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.visitorContainer}>
          {visitorData.map((visitor, index) => (
            <View key={index} style={styles.visitorItem}>
              <Text style={styles.itemText}>Name: {visitor.name}</Text>
              <Text style={styles.itemText}>
                Invite Date: {visitor.inviteDate}
              </Text>
              <Text style={styles.itemText}>
                Invite Time: {visitor.inviteTime}
              </Text>
              <Text style={styles.itemText}>
                Destination: {visitor.destination}
              </Text>
              <Text style={styles.itemText}>
                Entry Code: {visitor.entryCode}
              </Text>
              <Text style={styles.itemText}>
                Entry Date: {visitor.entryDate}
              </Text>
              <Text style={styles.itemText}>
                Entry Time: {visitor.entryTime}
              </Text>
              <Text style={styles.itemText}>Exit Date: {visitor.exitDate}</Text>
              <Text style={styles.itemText}>Exit Time: {visitor.exitTime}</Text>
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
});

export default ReportScreen;
