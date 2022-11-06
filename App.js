import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcomescreen from './src/globals/screens/Welcomescreen';
import Loginscreen from './src/globals/screens/Loginscreen';
import Signupscreen from './src/globals/screens/Signupscreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/HomeScreen';
import UsericonWindow from './src/globals/screens/global/UsericonWindow';
import ProductPage from './src/globals/screens/ProductPage';
import UserCart from './src/components/UserCart';
import PlaceOrder from './src/components/PlaceOrder';
import TrackOrder from './src/components/TrackOrder';
import FilterCatagories from './src/components/FilterCatagoriesByName';
import BottomSearch from './src/components/BottomNavSearch';


const Stack = createNativeStackNavigator();
export default function App() {
 
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='WelcomeScreen'>
        <Stack.Screen name="WelcomeScreen" component={Welcomescreen} 
        options={{
            headerShown: false,
        }}/>
        <Stack.Screen name="Loginscreen" component={Loginscreen} options={{
            headerShown: false,
        }} />
        <Stack.Screen name="Signupscreen" component={Signupscreen} options={{
            headerShown: false,
        }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
            headerShown: false,
        }} />
        <Stack.Screen name="UsericonWindow" component={UsericonWindow} options={{
            headerShown: false,
        }} />
        <Stack.Screen name="ProductPage" component={ProductPage} options={{
            headerShown: false,
        }} />
        <Stack.Screen name="UserCart" component={UserCart} options={{
            headerShown: false,
        }} />
         <Stack.Screen name="PlaceOrder" component={PlaceOrder} options={{
            headerShown: false,
        }} />
         <Stack.Screen name="TrackOrder" component={TrackOrder} options={{
            headerShown: false,
        }} />
         <Stack.Screen name="Filter" component={FilterCatagories} options={{
            headerShown: false,
        }} />
         <Stack.Screen name="Search" component={BottomSearch} options={{
            headerShown: false,
        }} />
       
      </Stack.Navigator>
    </NavigationContainer>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
