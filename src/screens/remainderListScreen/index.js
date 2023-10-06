import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";

import styles from "./style";
import emptyScreenImage from "../../../assets/images/reminderScreenImage.png";
import headerImage from "../../../assets/images/reminderScreenHeaderLogo.png";
import { useSelector } from "react-redux";
import { postRequest } from "../../utils/apiCallsHandler";
import { MaterialCommunityIcons } from "@expo/vector-icons/build/Icons";

const RemainderListScreen = ({ navigation }) => {
  const storedUserData = useSelector((state) => state.auth.userData);

  const [reminderList, setReminderList] = useState([]);
  console.log(reminderList);

  const getReminderList = async () => {
    try {
      const fetchList = await postRequest("getReminderList", {
        userId: storedUserData._id,
      });
      setReminderList(fetchList.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getReminderList();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {
        // SHOW FLATLIST IF REMINDER LIST IS AVAILABLE IN DATABSE ===================================>
        reminderList.length > 0 ? (
          <>
            <Image source={headerImage} style={styles.headerImage} />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={reminderList}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.medicineCardContainer}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="pill"
                        size={24}
                        color="#fff"
                      />
                      <Text style={styles.medicineName}>
                        {item.medicineName}
                      </Text>
                    </View>
                    <Text style={styles.timing}>
                      Timing :-{"  "} {new Date(item.time).getHours()} :{" "}
                      {new Date(item.time).getMinutes() < 10 ? `0${new Date(item.time).getMinutes()}`:
                      new Date(item.time).getMinutes()
                      }
                    </Text>
                    <Text style={styles.frequency}>
                      Servings :-{"  "} {item.frequency}
                    </Text>
                  </TouchableOpacity>
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
