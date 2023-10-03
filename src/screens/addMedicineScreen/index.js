import { View, Text, SafeAreaView, Image, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React, { useState } from "react";

import styles from "./style";
import medicineImage from "../../../assets/images/medicineImage.png";
const countries = [
  "Once Daily",
  "Twice Daily",
  "Thrice Dailly",
  "Weekly",
  "Monthly",
];

const AddMedicineScreen = ({navigation}) => {

    const[name,setName]=useState("");
    const[frequency,setFrequency]=useState("");

    console.log(frequency)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.medicineImageContainer}>
        <Image style={styles.medicineImage} source={medicineImage} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeadingText}>
          Write name of the Medicine you want to get remainded for ?
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          placeholderTextColor="#fff"
          value={name}
          onChangeText={(e)=>{
            setName(e)
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeadingText}>
          What would be doses frequency ?
        </Text>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            setFrequency(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddMedicineScreen;
