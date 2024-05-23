import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons

function ReportScreen(props) {
  const [visitorData, setVisitorData] = useState([]);
  const [filteredVisitorData, setFilteredVisitorData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [token, setToken] = useState("");
  const [residentId, setResidentId] = useState("");
  const [filterOption, setFilterOption] = useState("");

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
    console.log("ResidentID function has been called");

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
          .post("https://vms-admin-backend.onrender.com/visitorData", {
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

  useEffect(() => {
    filterData();
  }, [visitorData, searchText, filterOption]);

  const filterData = () => {
    let filtered = visitorData;

    if (filterOption === "Name") {
      filtered = visitorData.filter((visitor) =>
        visitor.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (filterOption === "Date") {
      filtered = visitorData.filter((visitor) =>
        visitor.inviteDate.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (filterOption === "Flat") {
      filtered = visitorData.filter((visitor) =>
        visitor.destination.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredVisitorData(filtered);
  };

  let visitorCounter = 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter: </Text>
        <TouchableOpacity
          style={[
            styles.filterOption,
            filterOption === "Name" && styles.selectedFilterOption,
          ]}
          onPress={() => setFilterOption("Name")}
        >
          <Text>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterOption,
            filterOption === "Date" && styles.selectedFilterOption,
          ]}
          onPress={() => setFilterOption("Date")}
        >
          <Text>Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterOption,
            filterOption === "Flat" && styles.selectedFilterOption,
          ]}
          onPress={() => setFilterOption("Flat")}
        >
          <Text>Flat</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <Button title="Search" onPress={filterData} />
        <TouchableOpacity
        // onPress={() => downloadGroupContent(visitorData.group)}
        >
          <FontAwesome name="download" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={styles.visitorContainer}>
              {filteredVisitorData.map((visitor, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.visitorItem,
                    {
                      backgroundColor: "#70bbcc",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    },
                  ]}
                  // onPress={() => downloadGroupContent(visitor.group)}
                >
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
                        GoingTo: Flat-
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
                        Entry Code:{" "}
                        {visitor.entryCode ? visitor.entryCode : "Null"}
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
                    <Text
                      style={[
                        styles.counterText,
                        {
                          color: "#fff",
                          marginTop: 15,
                          marginBottom: -5,
                          marginLeft: 130,
                        },
                      ]}
                    >
                      Invite {visitorCounter++}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.downloadButton}
        // onPress={downloadAllContent}
      >
        <Text style={styles.downloadButtonText}>Download All Content</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterLabel: {
    fontWeight: "bold",
    marginRight: 10,
  },
  filterOption: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#e0cbab",
    marginRight: 10,
    width: 50,
  },
  selectedFilterOption: {
    backgroundColor: "#70bbcc",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
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
  downloadButton: {
    backgroundColor: "#70bbcc",
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  downloadButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ReportScreen;
