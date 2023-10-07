import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";

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

  return (
    <SafeAreaView style={styles.mainContainer}>
      {
        // SHOW FLATLIST IF REMINDER LIST IS AVAILABLE IN DATABSE ===================================>
        reminderList.length > 0 ? (
          <>
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
                      <FontAwesome5 name="edit" size={24} color="#00ff7f" />
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
                        color="red"
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
