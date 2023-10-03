import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
    padding: 20,
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
  inputContainer:{
    gap:10,
    paddingVertical:5,
    marginVertical:5,
  },
  inputHeadingText:{
    fontSize:22,
    color:"#fff",
    fontWeight:"700"
  },
  textInput:{
     fontSize:20,
     fontWeight:"800",
     color:"#fff",
     padding:10,
     borderBottomColor:"#fff",
     borderBottomWidth:0.5,
  }
});

export default styles;
