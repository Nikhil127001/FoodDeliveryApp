import { View, Text , StyleSheet,Image,TouchableOpacity, Button,} from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Homeheadnavbar = ({navigation}) => {
  
  return (
    <View style = {styles.container}>
      <FontAwesome5 name="hamburger" size={40} color='#f5b013' />
      <View style = {styles.logobt}>
      <Image source={require('../../images/logo.png')} style={styles.logo}/>
      <Text style={styles.text}>Chilli Restro</Text>
      </View>
      <TouchableOpacity  >
      <MaterialIcons name="account-circle" size={40} color='#f5b013' onPress={() => navigation.navigate('UsericonWindow')} />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    height:60,
    flex:0,
    flexDirection:'row',
    backgroundColor: '#212120',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%'
  
  },
  logo:{
    height:50,
    width:55,
  },
  logobt:{
    flex:0,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  text:{
    color:'#f5b013',
    fontSize:22,
    fontWeight:'bold',
  },
})
export default Homeheadnavbar