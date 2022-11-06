import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const BottomNav = ({navigation}) => {
  return (
    <View style = {styles.bottomNavOut}>
    <View style = {styles.bottomNavItems}>
        <TouchableOpacity  onPress={()=>{navigation.navigate('HomeScreen')}}>
      <FontAwesome name="home" size={40}
       color='#f5b013' />
       </TouchableOpacity>
       <TouchableOpacity>
      <FontAwesome name="search" size={40} color='#f5b013' onPress={()=>{navigation.navigate('Search')}}/>
      </TouchableOpacity>
      <TouchableOpacity>
      <FontAwesome name="shopping-cart" size={40} color='#f5b013' onPress={()=>{navigation.navigate('UserCart')}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('TrackOrder')}>
      <MaterialIcons name="delivery-dining"  size={40} color='#f5b013' />
      <Text style={styles.track}>Orders</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default BottomNav

const styles = StyleSheet.create({
    bottomNavOut:{
        justifyContent:'center',
        alignItems:'center',
    },
    bottomNavItems:{
        flex:0,
        flexDirection:'row',
        justifyContent:'space-between',
        width:'90%',

    },
    track:{
        color:'#f5b013',
        top:0,
    },
})