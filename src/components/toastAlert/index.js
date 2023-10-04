import { View, Text } from "react-native";
import React from "react";
import { useToast } from "react-native-toast-notifications";
import appIcon from "../../../assets/icons/icon.png";

import styles from "./style";

const ToastAlert = (type, message) => {
  const toast = useToast();
  console.log(message);
  return (
    // <ToastProvider
    //   placement="bottom"
    //   duration={5000}
    //   animationType="slide-in"
    //   animationDuration={250}
    //   successColor="green"
    //   dangerColor="red"
    //   warningColor="orange"
    //   normalColor="gray"
    //   icon={appIcon}
    //   successIcon={appIcon}
    //   dangerIcon={appIcon}
    //   warningIcon={appIcon}
    //   textStyle={{ fontSize: 20 }}
    //   offset={50} // offset for both top and bottom toasts
    //   offsetTop={30}
    //   offsetBottom={40}
    //   swipeEnabled={true}
    //   renderToast={(toastOptions) => (
    //     <View style={{ padding: 15, backgroundColor: "grey" }}>
    //       <Text>{message}</Text>
    //     </View>
    //   )}
    // />
    <>
      {toast.show(message, {
        type: type,
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      })}
    </>
  );
};

export default ToastAlert;
