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
import { Entypo, Ionicons } from "@expo/vector-icons";

import medicineImage from "../../../assets/images/medicineImage.png";
import styles from "./style";
import { postRequest } from "../../utils/apiCallsHandler";
import { useSelector,useDispatch } from "react-redux";
import { addReminderData, setReminderData } from "../../redux/reminderSlice";
const dosesFrequencyList = [
  "Once Daily",
  "Twice Daily",
  "Thrice Daily",
  "Weekly",
  "Monthly",
];

const AddRemainderScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const storedUserData = useSelector(state=>state.auth.userData);
  // console.log(storedUserData)

  const [medicineName, SetMedicineName] = useState("");
  const [frequency, setFrequency] = useState("select an option");
  const [pillsCount, setPillsCount] = useState("");
  const [pillsStock, setPillsStock] = useState("");
  const [caretakerNumber, setCaretakerNumber] = useState("");

  const [date, setDate] = useState(new Date(3598050630000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  // console.log(date);

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

  const submitHandler = async () => {
    try {
      if(medicineName===""){
        return Alert.alert("Medicine name cannot be blank");
      }
      if(date=== new Date(1598051730000)){
        return Alert.alert("Please select a date for remainder");
      }
      if(pillsCount===""){
        return Alert.alert("Please select no of pills ");
      }
      if(pillsStock === ""){
        return Alert.alert("Please select pills in stock with you");
      }
      if(frequency===""){
        return Alert.alert("Please select the frequency of doses");
      }
      const saveRemainder = await postRequest("addReminder",{
         medicineName,
         frequency,
         time:date,
         pillsCount,
         pillsStock,
         caretakerNumber,
         userId:storedUserData._id
      });
      Alert.alert(`${saveRemainder.message}`);
      if(saveRemainder.success == true){
        SetMedicineName("");
        setDate(new Date(3598050630000));
        setFrequency("select an option")
        setPillsCount("");
        setPillsStock("");
        setCaretakerNumber("");
        dispatch(addReminderData({reminderData:saveRemainder.data}))
        navigation.navigate("Doses List");
      }
    } catch (error) {
      console.log(error.message);
    }
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
            placeholder="Enter medicine name "
            placeholderTextColor="#fff"
            autoCapitalize="none"
            value={medicineName}
            onChangeText={(e) => {
              SetMedicineName(e);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeadingText}>
            What would be doses frequency ?
          </Text>
          <SelectDropdown
            data={dosesFrequencyList}
            defaultValue={frequency}
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
          <Text style={styles.inputHeadingText}>
            Pill's count to take each time ?
          </Text>
          <TextInput
            style={styles.textInputNumber}
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor="#000"
            value={pillsCount}
            onChangeText={(e) => {
              e > 100
                ? Alert.alert("sorry😣", "Max limit is 10")
                : setPillsCount(e);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeadingText}>Total pill's in stock ?</Text>
          <TextInput
            style={styles.textInputNumber}
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor="#000"
            value={pillsStock}
            onChangeText={(e) => {
              setPillsStock(e);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeadingText}>
            To assign a caretaker , provide number ?{`(optional)`}
          </Text>
          <TextInput
            style={styles.textInputPhone}
            placeholder="Enter number"
            keyboardType="numeric"
            placeholderTextColor="#000"
            value={caretakerNumber}
            onChangeText={(e) => {
              e.length > 10
                ? Alert.alert("sorry😕", "number should be of 10 digits")
                : setCaretakerNumber(e);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={() => submitHandler()}
        >
          <Text style={styles.submitText}>save</Text>
          <Entypo name="save" size={24} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddRemainderScreen;
