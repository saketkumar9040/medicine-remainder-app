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
    height: 180,
    width: 180,
    resizeMode:"center"
  },
  inputContainer:{
    gap:10,
    paddingVertical:5,
    marginVertical:5,
  },
  inputHeadingText:{
    fontSize:20,
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
  },
  timeContainer:{
    flexDirection:"row",
    alignItems:'center',
    elevation:10,
  },
  timeText:{
     fontSize:18,
     fontWeight:"800",
     backgroundColor:"#fff",
     padding:3,
     paddingHorizontal:30,
     marginRight:10,
     borderRadius:5,
  },
  textInputNumber:{
    backgroundColor:'#fff',
    paddingHorizontal:58,
    padding:3,
    alignSelf:"flex-start",
    fontSize:18,
    fontWeight:"800",
    borderRadius:5,
  },
  submitContainer:{
    backgroundColor:"#00ff7f",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    paddingHorizontal:30,
    marginTop:20,
    alignSelf:"center",
    padding:3,
    paddingHorizontal:60,
    borderRadius:10,
  },
  submitText:{
    fontSize:22,
    fontWeight:"800",
    letterSpacing:1,
    color:"#fff"
  }
});

export default styles;
