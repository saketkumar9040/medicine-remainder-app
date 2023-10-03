import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListScreen from "../screens/listScreen";
import AddMedicineScreen from "../screens/addMedicineScreen"

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
    return(
        <Tabs.Navigator>
            <Tabs.Screen name="list" component={ListScreen} options={{headerShown:false}}/>
            <Tabs.Screen name="addMedicine" component={AddMedicineScreen}/>
        </Tabs.Navigator>
    )
}

const MainNavigator = () => {
    return(
   <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="main" component={TabsNavigator} options={{headerShown:false}}/>
    </Stack.Navigator>
   </NavigationContainer>
    )
};

export default MainNavigator;