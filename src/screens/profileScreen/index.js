import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  FontAwesome5,
  EvilIcons,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import messaging from "@react-native-firebase/messaging";

import styles from "./style";
const genderList = ["Male", "Female", "Others"];
import watsAppImage from "../../../assets/images/watsAppImage.png";
import { postRequest } from "../../utils/apiCallsHandler";
import DeviceInfo from "react-native-device-info";
import { useSelector } from "react-redux";

const ProfileScreen = () => {

  const storedUserData = useSelector(state=>state.auth.userData);

  const [userName, setUserName] = useState(storedUserData?.userName);
  const [gender, setGender] = useState(storedUserData?.gender ??"select");
  const [email, setEmail] = useState(storedUserData?.email);
  const [phone, setPhone] = useState(storedUserData?.phone);
  const [watsAppNumber, setWatsAppNumber] = useState(storedUserData?.watsAppNumber);
  const [profilePicUrl, setProfilePicUrl] = useState(storedUserData?.profilePicUrl);

  const submitHandler = async () => {
    try {
      if (phone && phone.length < 10) {
        return Alert.alert("Phone number should be 10 digits");
      }
      if (watsAppNumber && watsAppNumber.length < 10) {
        return Alert.alert("Phone number should be 10 digits");
      }
      let data = {};
      if (userName) {
        data.userName = userName;
      }
      if (gender) {
        data.gender = gender;
      }
      if (email) {
        data.email = email;
      }
      if (phone) {
        data.phone = phone;
      }
      if (watsAppNumber) {
        data.watsAppNumber = watsAppNumber;
      }
      if(profilePicUrl) {
        data.profilePicUrl = profilePicUrl
      }

      const userId = storedUserData._id
      data.userId = userId;

      const saveUserDetails = await postRequest("addUserDetails", data);
      console.log(saveUserDetails.data);
      return Alert.alert(saveUserDetails.message);
    } catch (error) {
      console.log(error.message);
      Alert.alert("sorry😌", "unable to update user information");
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <EvilIcons name="user" size={150} color="#00ff7f" />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Nickname"
          placeholderTextColor="#fff"
          autoCapitalize="none"
          value={userName}
          onChangeText={(e) => {
            setUserName(e);
          }}
        />
      </View>

      <View style={{ ...styles.inputContainer }}>
        <Text style={{ ...styles.inputHeadingText, flex: 1 }}>Gender</Text>
        <SelectDropdown
          data={genderList}
          defaultValue={gender}
          defaultButtonText="select"
          onSelect={(selectedItem, index) => {
            setGender(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          buttonStyle={{
            width: 100,
            marginTop: 20,
            height: 30,
            borderRadius: 5,
          }}
          buttonTextStyle={{
            fontWeight: "900",
          }}
        />
      </View>

      <View style={{ ...styles.inputContainer }}>
        <MaterialCommunityIcons name="email-outline" size={34} color="#fff" />
        <TextInput
          style={styles.textInput}
          placeholder="Enter e-mail address"
          keyboardType="email-address"
          placeholderTextColor="#00ff7f"
          value={email}
          onChangeText={(e) => {
            setEmail(e);
          }}
        />
      </View>

      <View style={{ ...styles.inputContainer }}>
        <Ionicons name="call-outline" size={34} color="#fff" />
        <TextInput
          style={styles.textInput}
          placeholder="Enter phone number"
          keyboardType="numeric"
          placeholderTextColor="#00ff7f"
          value={phone?.toString()}
          onChangeText={(e) => {
            e.length > 11
              ? Alert.alert("Phone number should be 10 digits")
              : setPhone(e);
          }}
        />
      </View>

      <View style={{ ...styles.inputContainer }}>
        <Image source={watsAppImage} style={styles.image} />
        <TextInput
          style={styles.textInput}
          placeholder="Enter watsApp number"
          keyboardType="numeric"
          placeholderTextColor="#00ff7f"
          value={watsAppNumber?.toString()}
          onChangeText={(e) => {
            e.length > 11
              ? Alert.alert("WatsApp number should be 10 digits")
              : setWatsAppNumber(e);
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.submitContainer}
        onPress={() => submitHandler()}
      >
        <Text style={styles.submitText}>SAVE</Text>
        <Entypo name="save" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
