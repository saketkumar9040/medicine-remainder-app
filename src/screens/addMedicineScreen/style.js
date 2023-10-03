import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
    padding: 15,
    backgroundColor: "#000",
  },
  medicineImageContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  medicineImage: {
    height: 200,
    width: 200,
    resizeMode:"center"
  },
});

export default styles;
