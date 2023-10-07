import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";

import styles from "./style";
import emptyScreenImage from "../../../assets/images/reminderScreenImage.png";
import headerImage from "../../../assets/images/reminderScreenHeaderLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { postRequest } from "../../utils/apiCallsHandler";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons/build/Icons";
import { setReminderData } from "../../redux/reminderSlice";

const dosesFrequencyList = [
  "Once Daily",
  "Twice Daily",
  "Thrice Daily",
  "Weekly",
  "Monthly",
];

const RemainderListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const storedUserData = useSelector((state) => state.auth.userData);
  const reminderList = useSelector((state) => state.reminder.reminderData);
  const [isModalVisible, setModalVisible] = useState(false);

  const [medicineDetails, setMedicineDetails] = useState({
    id:"",
    medicineName: "",
    frequency: "select an option",
    time:"",
    pillsCount: "",
    pillsStock: "",
    caretakerNumber: "",
  });
  // console.log(medicineDetails?.time?.getHours());

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  // console.log(date);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setMedicineDetails({...medicineDetails,time:currentDate})
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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const deleteReminder = async (id) => {
    try {
      const deleteReminder = await postRequest("deleteReminder", { id });
      const fetchNewReminderList = await postRequest("getReminderList", {
        userId: storedUserData._id,
      });
      dispatch(setReminderData({ reminderData: fetchNewReminderList.data }));
      Alert.alert(`${deleteReminder.message}`);
    } catch (error) {
      console.log(error);
    }
  };

  const editReminderHandler = async () => {
    try {
      const editData = await postRequest("editReminder",medicineDetails);
      const reminderData = await postRequest("getReminderList",{userId:storedUserData._id});
      dispatch(setReminderData({ reminderData: reminderData.data }));
      Alert.alert(editData.message);
      toggleModal();
      setMedicineDetails({
        id:"",
        medicineName: "",
        frequency: "select an option",
        time:"",
        pillsCount: "",
        pillsStock: "",
        caretakerNumber: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {
        // SHOW FLATLIST IF REMINDER LIST IS AVAILABLE IN DATABSE ===================================>
        reminderList.length > 0 ? (
          <>
            <Modal isVisible={isModalVisible}>
              <ScrollView>
              <View style={{ flex: 1, backgroundColor: "#000" }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    marginBottom: 20,
                  }}
                  onPress={toggleModal}
                >
                  <Feather name="x-circle" size={46} color="red" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: "800",
                    marginLeft: 20,
                  }}
                >
                  Medicine Name
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "#fff",
                    margin: 20,
                    padding: 5,
                    paddingHorizontal: 20,
                    fontSize: 20,
                    fontWeight: "900",
                    borderRadius: 10,
                  }}
                  autoCapitalize="none"
                  value={medicineDetails.medicineName}
                  onChangeText={(e) => {
                    setMedicineDetails({
                      ...medicineDetails,
                      medicineName: e,
                    });
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: "800",
                    marginLeft: 20,
                  }}
                >
                  Pills frequency
                </Text>
                <SelectDropdown
                  data={dosesFrequencyList}
                  defaultValue={medicineDetails.frequency}
                  onSelect={(selectedItem, index) => {
                    setMedicineDetails({
                      ...medicineDetails,
                      frequency: selectedItem,
                    });
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  buttonStyle={{
                    backgroundColor: "#fff",
                    margin: 10,
                    
                    width: "90%",
                    alignSelf: "center",

                    borderRadius: 10,
                  }}
                  buttonTextStyle={{
                    fontWeight: "900",
                  }}
                />

                <Text
                  style={{
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: "800",
                    marginLeft: 20,
                  }}
                >
                  Timing
                </Text>
                <TouchableOpacity onPress={() => showTimepicker()}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      elevation: 10,
                      margin: 10,
                    }}
                  >
              {
                medicineDetails.time && (
                  <Text
                  style={{
                    flex:1,
                    fontSize: 18,
                    fontWeight: "800",
                    backgroundColor: "#fff",
                    padding: 3,
                    paddingHorizontal: 30,
                    marginRight: 10,
                    marginLeft:10,
                    borderRadius: 5,
                  }}
                >
                  {medicineDetails.time.getHours() % 12 > 0 ? medicineDetails.time.getHours() % 12 : 12} :{" "}
                  {medicineDetails.time.getMinutes() < 10
                    ? "0" + medicineDetails.time.getMinutes()
                    : medicineDetails.time.getMinutes()}{" "}
                  {medicineDetails.time.getHours() >= 12 ? "pm" : "am"}
                </Text>
                )
              }
                    <Ionicons name="alarm" size={40} color="#fff" />
                  </View>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={medicineDetails.time}
                    mode={mode}
                    //   is24Hour={true}
                    onChange={onChange}
                  />
                )}

                <Text
                  style={{
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: "800",
                    marginLeft: 20,
                  }}
                >
                  Pills count
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "#fff",
                    margin: 20,
                    padding: 5,
                    paddingHorizontal: 20,
                    fontSize: 20,
                    fontWeight: "900",
                    borderRadius: 10,
                  }}
                  autoCapitalize="none"
                  value={medicineDetails.pillsCount}
                  onChangeText={(e) => {
                    setMedicineDetails({
                      ...medicineDetails,
                      pillsCount: e,
                    });
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: "800",
                    marginLeft: 20,
                  }}
                >
                  Pills stock
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "#fff",
                    margin: 20,
                    padding: 5,
                    paddingHorizontal: 20,
                    fontSize: 20,
                    fontWeight: "900",
                    borderRadius: 10,
                  }}
                  autoCapitalize="none"
                  value={medicineDetails.pillsStock}
                  onChangeText={(e) => {
                    setMedicineDetails({
                      ...medicineDetails,
                      pillsStock: e,
                    });
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: "800",
                    marginLeft: 20,
                  }}
                >
                  Caretaker number
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "#fff",
                    margin: 20,
                    padding: 5,
                    paddingHorizontal: 20,
                    fontSize: 20,
                    fontWeight: "900",
                    borderRadius: 10,
                  }}
                  autoCapitalize="none"
                  value={medicineDetails.caretakerNumber}
                  onChangeText={(e) => {
                    setMedicineDetails({
                      ...medicineDetails,
                      caretakerNumber: e,
                    });
                  }}
                />
              </View>
              </ScrollView>
              <Button title="SAVE" onPress={editReminderHandler} color="#00ff7f" />
            </Modal>

            <View
              style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
            >
              <Image source={headerImage} style={styles.headerImage} />
              <Text style={styles.headerText}>REMINDERS</Text>
            </View>
            <FlatList
              style={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              data={reminderList}
              renderItem={({ item, index }) => {
                return (
                  <View key={index} style={styles.medicineCardContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="pill"
                        size={35}
                        color="#00FFFF"
                      />
                      <Text style={styles.medicineName}>
                        {item.medicineName}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          toggleModal();
                          setMedicineDetails({
                            id:item._id,
                            medicineName: item.medicineName,
                            frequency: item.frequency,
                            time:new Date(item.time),
                            pillsCount: item.pillsCount,
                            pillsStock: item.pillsStock,
                            caretakerNumber: item.caretakerNumber ?? "",
                          });
                        }}
                      >
                        <FontAwesome5 name="edit" size={24} color="#00ff7f" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.timing}>
                      Timing :-{"  "}{" "}
                      {new Date(item.time).getHours() % 12 > 0
                        ? new Date(item.time).getHours() % 12
                        : 12}{" "}
                      :{" "}
                      {new Date(item.time).getMinutes() < 10
                        ? `0${new Date(item.time).getMinutes()}`
                        : new Date(item.time).getMinutes()}{" "}
                      {new Date(item.time).getHours() >= 12 ? "PM" : "AM"}
                    </Text>
                    <Text style={styles.frequency}>
                      Servings :-{"  "} {item.frequency}
                    </Text>
                    <TouchableOpacity onPress={() => deleteReminder(item._id)}>
                      <AntDesign
                        name="delete"
                        size={30}
                        color="#EE4B2B"
                        style={{ position: "absolute", bottom: 0, right: 0 }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </>
        ) : (
          <>
            <View style={styles.imageContainer}>
              <Image
                source={emptyScreenImage}
                style={styles.emptyScreenImage}
              />
            </View>
            <Text style={styles.addRemainderText}>
              {" "}
              Add remainder to never miss your scheduled medicine time
            </Text>

            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => navigation.navigate("Add Remainder")}
            >
              <Entypo name="add-to-list" size={34} color="#fff" />
            </TouchableOpacity>
          </>
        )
      }
    </SafeAreaView>
  );
};

export default RemainderListScreen;
