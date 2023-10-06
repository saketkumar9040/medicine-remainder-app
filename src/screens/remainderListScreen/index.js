import { View, Text, SafeAreaView, Image ,TouchableOpacity} from "react-native";
import React,{useState,useEffect} from "react";
import { Entypo,} from "@expo/vector-icons";

import styles from "./style";
import emptyScreenImage from "../../../assets/images/reminderScreenImage.png";
import { useSelector } from "react-redux";

const RemainderListScreen = ({navigation}) => {

   const reminderList = useSelector(state =>state.reminder.reminderData);
   console.log(reminderList);

  useEffect(()=>{
    //  FETCH REMINDER LIST FROM DATABSE ==================================================>
  },[])

  return (
    <SafeAreaView style={styles.mainContainer}>
    {
      // SHOW FLATLIST IF REMINDER LIST IS AVAILABLE IN DATABSE ===================================>
    }

      <View style={styles.imageContainer}>
        <Image source={emptyScreenImage} style={styles.emptyScreenImage} />
      </View>
      <Text style={styles.addRemainderText}> Add remainder to never miss your scheduled medicine time</Text>
        
      <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => navigation.navigate("Add Remainder")}
        >
          <Entypo name="add-to-list" size={34} color="#fff" />
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RemainderListScreen;
