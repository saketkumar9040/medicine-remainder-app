import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        paddingTop:Platform.OS ==="android"?40:0,
        backgroundColor:"#000"
    }
});

export default styles;