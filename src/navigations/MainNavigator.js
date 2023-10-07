import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import DeviceInfo from "react-native-device-info";
import "expo-dev-client";
import messaging from "@react-native-firebase/messaging";
import TabsNavigator from "./TabsNavigator.js";
import { postRequest } from "../utils/apiCallsHandler";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/authSlice.js";
import { setReminderData } from "../redux/reminderSlice.js";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const dispatch = useDispatch();

  //  FIREBASE CLOUD MESSAGING  ==========================================================>

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  useEffect(() => {
    onFetchUpdateAsync();

    if (requestUserPermission()) {
      // RETURN FCM TOKEN FOR THE DEVICE ==================================================>
      const getFCMToken = async() => {
        const token =await  messaging().getToken();
        await createUser(DeviceInfo.getUniqueIdSync(),token);
      };
      getFCMToken()
    } else {
      console.log("Failed token status", authStatus);
    };

    // CHECK WHETHER INITIAL NOTIFICATION IS AVAILABLE =======================================>

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    // Register background handler   ============================================================>
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    //  FOREGROUND STATE  MESSAGE  ==============================================================>
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(`${remoteMessage.notification.title}`, `${remoteMessage.notification.body}`);
    });
    return unsubscribe;

  }, []);

  //  IMPLEMENTING EXPO - UPDATES   ==============================================================>

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      if (
        error.message ===
        "You cannot check for updates in development mode. To test manual updates, publish your project using `expo publish` and open the published version in this development client."
      ) {
        console.log(error.message);
      }
      if (
        error.message ===
        "You cannot check for updates in development mode. To test manual updates, make a release build with `npm run ios --configuration Release` or `npm run android --variant Release`."
      ) {
        console.log(error.message);
      } else {
        // console.log(error.message)
        alert(`Error fetching latest Expo update: ${error.message}`);
      }
    }
  }

  //  CREATING/FETCHING USER WHEN USER ENTER APP  ==================================================>

  const createUser = async (deviceId, FCMToken) => {
    try {
      const create = await postRequest("createUser", { deviceId, FCMToken });
       dispatch(setUserData({userData:create.data}));
       const reminderData = await postRequest("getReminderList",{userId:create.data._id});
       dispatch(setReminderData({reminderData:reminderData.data}))
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
