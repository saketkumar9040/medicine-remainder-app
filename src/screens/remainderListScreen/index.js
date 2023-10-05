import { View, Text, SafeAreaView, Image ,TouchableOpacity} from "react-native";
import React from "react";
import { Entypo,} from "@expo/vector-icons";

import styles from "./style";
import emptyScreenImage from "../../../assets/images/reminderScreenImage.png";

const RemainderListScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>


      <View style={styles.imageContainer}>
        <Image source={emptyScreenImage} style={styles.emptyScreenImage} />
      </View>
      <Text style={styles.addRemainderText}> Add remainder to never miss your scheduled medicine time</Text>
        
      <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => submitHandler()}
        >
          <Entypo name="add-to-list" size={34} color="#fff" />
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RemainderListScreen;
