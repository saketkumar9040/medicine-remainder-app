import { View, Text, SafeAreaView ,Image} from "react-native";
import React from "react";

import styles from "./style";
import medicineImage from "../../../assets/images/medicineImage.png"

const AddMedicineScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.medicineImageContainer}>
        <Image style={styles.medicineImage} source={medicineImage}/>
      </View>
    </SafeAreaView>
  );
};

export default AddMedicineScreen;
