import { View, Text ,StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import { useState,useEffect } from 'react';
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


  
const Catagories = ({navigation}) => {


  return (
    <View style ={styles.container}>
      <Text style ={styles.heading} >Catagories</Text>
      <ScrollView horizontal>
      <TouchableOpacity onPress={ ()=> {navigation.navigate('Filter','BurgerData')}}>
        <View style={styles.dimensions}>
        <MaterialCommunityIcons name="hamburger" size={50} color="black" />
        <Text>Burger</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={ ()=> {navigation.navigate('Filter','PizzaData')}}>
        <View style={styles.dimensions}>
        <FontAwesome5 name="pizza-slice"  size={50} color="black" />
        <Text>Pizza</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ ()=> { navigation.navigate('Filter','JuiceData')}}>
        <View style={styles.dimensions}>
        <MaterialCommunityIcons name="glass-mug"size={50} color="black" />
        <Text>Juice</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ ()=> {navigation.navigate('Filter','NonVegData')}}>
        <View style={styles.dimensions}>
        <MaterialCommunityIcons name="food-turkey" size={50} color="black" />
        <Text>Non-Veg</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ ()=> { navigation.navigate('Filter','FruitData');}}>
        <View style={styles.dimensions}>
        <MaterialCommunityIcons name="food-apple" size={50} color="black" />
        <Text>Fruit Salade</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ ()=> { navigation.navigate('Filter','ChineaseData');}}>
        <View style={styles.dimensions}>
        <MaterialCommunityIcons name="noodles" size={50} color="black" />
        <Text>Chinease Food</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ ()=> { navigation.navigate('Filter','DesertData')}}>
        <View style={styles.dimensions}>
        <FontAwesome5 name="ice-cream" size={50} color="black" />
        <Text>Deserts</Text>
        </View>
        </TouchableOpacity>
      </ScrollView>


      
    </View>
  )
}
const styles = StyleSheet.create({

    container:{
      marginTop:10,
      width:'100%',
      height:150,
      backgroundColor:'#212120',
      alignItems:'center',
      
      borderRadius:10,
      justifyContent:'center',
    },
    heading:{
        fontSize:22,
        color:'#f5b013',
        marginTop:5,
    },

    dimensions:{
        backgroundColor:'#f5b013',
        alignItems:'center',
        justifyContent:'center',
        width:90,
        height:100,
        marginTop:5,
        borderRadius:10,
        marginLeft:10,

    },
  })

export default Catagories