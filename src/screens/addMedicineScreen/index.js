import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";

import medicineImage from "../../../assets/images/medicineImage.png";
import styles from "./style";
import { Entypo, Ionicons } from "@expo/vector-icons";
const dosesFrequencyList = [
  "Once Daily",
  "Twice Daily",
  "Thrice Daily",
  "Weekly",
  "Monthly",
];

const AddMedicineScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [pillsCount, setPillsCount] = useState("0");

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  //   console.log(date.toLocaleTimeString());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.medicineImageContainer}>
        <Image style={styles.medicineImage} source={medicineImage} />
      </View>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeadingText}>
            Write name of the Medicine you want to get remainded for ?
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            placeholderTextColor="#fff"
            value={name}
            onChangeText={(e) => {
              setName(e);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeadingText}>
            What would be doses frequency ?
          </Text>
          <SelectDropdown
            data={dosesFrequencyList}
            defaultValueByIndex={0}
            onSelect={(selectedItem, index) => {
              setFrequency(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            buttonStyle={{
              marginTop: 20,
              height: 30,
              borderRadius: 5,
            }}
            buttonTextStyle={{
              fontWeight: "900",
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeadingText}>
            Please select a time to get reminded ?
          </Text>
          <TouchableOpacity onPress={() => showTimepicker()}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {date.getHours() % 12 > 0 ? date.getHours() % 12 : 12} :{" "}
                {date.getMinutes() < 10
                  ? "0" + date.getMinutes()
                  : date.getMinutes()}{" "}
                {date.getHours() >= 12 ? "pm" : "am"}
              </Text>
              <Ionicons name="alarm" size={40} color="#fff" />
            </View>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              //   is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputHeadingText}>Pill's count ?</Text>
          <TextInput
            style={styles.textInputNumber}
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor="#fff"
            value={pillsCount}
            onChangeText={(e) => {
              e > 9
                ? Alert.alert("sorry😣", "Max limit is 10")
                : setPillsCount(e);
            }}
          />
        </View>
      <TouchableOpacity style={styles.submitContainer}>
        <Text style={styles.submitText}>save</Text>
        <Entypo name="save" size={24} color="#fff" />
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMedicineScreen;
