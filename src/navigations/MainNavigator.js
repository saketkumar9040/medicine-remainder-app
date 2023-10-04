import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListScreen from "../screens/listScreen";
import AddMedicineScreen from "../screens/addMedicineScreen";
import ProfileScreen from "../screens/profileScreen";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#4c4c4c",
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 7,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "800",
          marginBottom: 5,
        },
        tabBarActiveTintColor: "#00FF7F",
        tabBarInactiveTintColor:"#fff",
      }}
    >
      {/* <Tabs.Screen
        name="Doses List"
        component={ListScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="notes-medical"
              size={24}
              color={focused ? "#00FF7F" : "#fff"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Add Medicine"
        component={AddMedicineScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name="capsules"
              size={24}
              color={focused ? "#00FF7F" : "#fff"}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "#00FF7F" : "#fff"}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const MainNavigator = () => {
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
