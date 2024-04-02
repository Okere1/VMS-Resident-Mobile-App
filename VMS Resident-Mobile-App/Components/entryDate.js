import { Text, View, TextInput, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../Styles/DateStyle";

function EntryDate({ entryDate, setEntryDate }) {
  const [mode, setMode] = useState("date");
  const [date1, setDate1] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangeDateOnSite = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate1(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setEntryDate(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setEntryDate(date1.toDateString());
    toggleDatePicker();
  };
  return (
    <View>
      {/* DATE ON SITE */}

      {showPicker && (
        <DateTimePicker
          mode={mode}
          display="spinner"
          value={date1}
          onChange={onChangeDateOnSite}
          style={styles.datePicker}
        />
      )}

      {!showPicker && (
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter Date on Site"
            value={entryDate}
            onChangeText={setEntryDate}
            editable={false}
            onPressIn={toggleDatePicker}
            placeholderTextColor="#c9d3d8"
          />
        </Pressable>
      )}

      {showPicker && Platform.OS === "ios" && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.pickerButton,
              {
                backgroundColor: "#fff",
                padding: 5,
                borderRadius: 5,
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: "#075985",
                },
              ]}
              onPress={toggleDatePicker}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.pickerButton,
              { backgroundColor: "#fff", padding: 5, borderRadius: 5 },
            ]}
            onPress={confirmIOSDate}
          >
            <Text style={[styles.buttonText]} onPress={toggleDatePicker}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default EntryDate;
