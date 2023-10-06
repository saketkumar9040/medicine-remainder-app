import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
    backgroundColor: "#000",
  },
  imageContainer: {
    marginVertical: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyScreenImage: {
    width: 300,
    height: 300,
    resizeMode: "stretch",
  },
  addButtonContainer: {
    backgroundColor: "#00ff7f",
    padding: 15,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addRemainderText: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 50,
  },
  medicineCardContainer: {
    margin: 10,
    marginTop:20,
    padding:20,
    marginHorizontal:20,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius:10,
  },
  headerImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    resizeMode: "center",
  },
  medicineName:{
    fontSize:22,
    fontWeight:"800",
    color:"#fff",
  },
  timing:{
    fontSize:22,
    fontWeight:"300",
    color:"#fff",
    marginVertical:10,
  },
  frequency:{
    fontSize:18,
    fontWeight:"300",
    color:"#fff",
  }
});

export default styles;
