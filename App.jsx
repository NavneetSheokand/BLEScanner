import React from 'react';
import {  StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/HomeScreen';
import CheckInScreen from './Components/Screens/CheckIn.js';
import CheckOutScreen from './Components/Screens/CheckOut.js';

import InventoryScreen from './Components/Screens/InventoryItems';
import ReportsAnalyticsScreen from './Components/Screens/ReportAnalytics';


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen } />
        <Stack.Screen name="CheckIn" component={CheckInScreen} />

        <Stack.Screen name="CheckOut" component={CheckOutScreen} />
        <Stack.Screen name="InventoryItems" component={InventoryScreen} />
        <Stack.Screen name="ReportsAnalytics" component={ReportsAnalyticsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
