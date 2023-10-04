import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5, EvilIcons, Entypo, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./style";
import SelectDropdown from "react-native-select-dropdown";
const genderList = [
  "Male","Female","Others"
];
import phoneImage from "../../../assets/images/phoneImage.png"
import emailImage from "../../../assets/images/emailImage.png"
import watsAppImage from "../../../assets/images/watsAppImage.png";

const ProfileScreen = () => {

  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [watsUpNumber, setWatsUpNumber] = useState("");

  const [ isUpdated,setIsUpdated] = useState(false);

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

      <View style={{...styles.inputContainer}}>
          <Text style={{...styles.inputHeadingText,flex:1,}}>
            Gender
          </Text>
          <SelectDropdown
            data={genderList}
            // defaultValueByIndex={0}
            defaultButtonText="select"
            onSelect={(selectedItem, index) => {
              setGender(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            buttonStyle={{
              width:100,
              marginTop: 20,
              height: 30,
              borderRadius: 5,
            }}
            buttonTextStyle={{
              fontWeight: "900", 
            }}
          />
        </View>

        <View style={{...styles.inputContainer}}>
        {/* <Image source={emailImage} style={styles.image}/> */}
        <MaterialCommunityIcons name="email" size={34} color="#fff" />
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

        <View style={{...styles.inputContainer}}>
           {/* <Image source={phoneImage} style={styles.image}/> */}
           <FontAwesome5 name="phone-alt" size={34} color="#fff" />
          <TextInput
            style={styles.textInput}
            placeholder="Enter phone number"
            keyboardType="numeric"
            placeholderTextColor="#00ff7f"
            value={phone}
            onChangeText={(e) => {
               setPhone(e);
            }}
          />
        </View>

        <View style={{...styles.inputContainer}}>
        <Image source={watsAppImage} style={styles.image}/>
          <TextInput
            style={styles.textInput}
            placeholder="Enter watsApp number"
            keyboardType="numeric"
            placeholderTextColor="#00ff7f"
            value={phone}
            onChangeText={(e) => {
               setPhone(e);
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

    </SafeAreaView>
  );
};

export default ProfileScreen;
