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
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import Modal from "react-native-modal";

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

const RemainderListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const storedUserData = useSelector((state) => state.auth.userData);
  const reminderList = useSelector((state) => state.reminder.reminderData);
  const [isModalVisible, setModalVisible] = useState(false);

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
       
    } catch (error) {
        console.log(error.message)
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {
        // SHOW FLATLIST IF REMINDER LIST IS AVAILABLE IN DATABSE ===================================>
        reminderList.length > 0 ? (
          <>
            <Modal isVisible={isModalVisible}>
              <View style={{ flex: 1,backgroundColor:"#000",opacity:0.5}}>
                <Text>Hello!</Text>
                /* medicine  name edit */
                <TextInput/>
                /* frequency edit */
                <TextInput/>
                /* time edit */
                <TextInput/>
                /* caretaker number edit */
                <TextInput/>
              </View>
                <Button title="SAVE" onPress={toggleModal} color="#00ff7f" />
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
