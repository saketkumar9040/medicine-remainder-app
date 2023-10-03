import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React, { useState } from "react";

import styles from "./style";
import medicineImage from "../../../assets/images/medicineImage.png";
const countries = [
  "Once Daily",
  "Twice Daily",
  "Thrice Daily",
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
          defaultValueByIndex={0}
          onSelect={(selectedItem, index) => {
            setFrequency(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          buttonStyle={{
            marginTop:20,
            height:30,
          }}
          buttonTextStyle={{
            fontWeight:"900"
          }}

        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeadingText}>
          Please select a time to get reminded ?
        </Text>
         
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMedicineScreen;
