import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        paddingTop:Platform.OS ==="android"?40:0,
        backgroundColor:"#000"
    },
    imageContainer:{
        marginVertical:80,
        alignItems:"center",
        justifyContent:"center"
    },
    emptyScreenImage:{
        width:300,
        height:300,
        resizeMode:"stretch"
    },
    addButtonContainer:{
        backgroundColor:"#00ff7f",  
        padding:15,
        borderRadius:50,
        position:'absolute',
        bottom:20,
        right:20,
      },
      addRemainderText:{
        fontSize:22,
        fontWeight:"800",
        letterSpacing:1,
        color:"#fff",
        textAlign:'center',
        paddingHorizontal:50,
      },

});

export default styles;