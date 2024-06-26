import React, { useState } from "react";
import { Text, View, TextInput, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../Styles/DateStyle";

function InviteTime({ inviteTime, setInviteTime }) {
  const [mode, setMode] = useState("time");
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleTimePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangeTime = ({ type }, selectedTime) => {
    if (type === "set") {
      const currentTime = selectedTime;
      setTime(currentTime);
      if (Platform.OS === "android") {
        toggleTimePicker();
        setInviteTime(currentTime.toLocaleTimeString());
      }
    } else {
      toggleTimePicker();
    }
  };

  const confirmIOSTime = () => {
    setInviteTime(time.toLocaleTimeString());
    toggleTimePicker();
  };

  return (
    <View>
      {/* Entry Time */}

      {showPicker && (
        <DateTimePicker
          mode={mode}
          display="spinner"
          value={time}
          onChange={onChangeTime}
          style={styles.datePicker}
        />
      )}

      {!showPicker && (
        <Pressable onPress={toggleTimePicker}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter Time"
            value={inviteTime}
            onChangeText={setInviteTime}
            editable={false}
            onPressIn={toggleTimePicker}
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
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 5,
                },
              ]}
              onPress={toggleTimePicker}
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
            onPress={confirmIOSTime}
          >
            <Text style={[styles.buttonText]} onPress={toggleTimePicker}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default InviteTime;
