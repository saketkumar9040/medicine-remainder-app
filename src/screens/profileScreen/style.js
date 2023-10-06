import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    gap: 10,
    paddingVertical: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputHeadingText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "700",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    color: "#00ff7f",
    padding: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 0.5,
  },
  textInputNumber: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    padding: 3,
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "800",
    borderRadius: 5,
  },
  image: {
    width: 35,
    height: 35,
    resizeMode: "center",
  },
  submitContainer: {
    backgroundColor: "#00ff7f",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    marginVertical: 5,
    padding: 3,
    borderRadius: 10,
  },
  submitText: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#fff",
    letterSpacing:5,
  },
});

export default styles;
