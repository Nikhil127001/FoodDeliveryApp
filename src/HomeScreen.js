import { StatusBar, StyleSheet, Text, View, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Homeheadnavbar from './components/Homeheadnavbar'
import Catagories from './components/catagories'
import OfferSlider from './components/OfferSlider'
import { FontAwesome5 } from '@expo/vector-icons'


import { firebase } from '../firebase/FirebaseConfig'
import CardSlider from './components/CardSlider'
import { AntDesign } from '@expo/vector-icons';
import BottomNav from './components/BottomNavbar'
const HomeScreen = ({navigation}) => {
  const [foodData, setfoodData] = useState([]);
  const [vegData, setvegData] = useState([]);
  const [nonvegData, setnonvegData] = useState([]);

  const foodRef = firebase.firestore().collection('FoodData')

  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setfoodData(snapshot.docs.map(doc => doc.data()))
    })
  }, [])
  useEffect(() => {
    setnonvegData(foodData.filter(item => item.FoodType == 'Non-Veg'))
    setvegData(foodData.filter(item => item.FoodType == 'veg'))

  }, [foodData])

  const [search, setsearch] = useState('')
  console.log(search)
  const openProductPage =(item) =>{
    navigation.navigate('ProductPage',item)
}
  return (
    <View style={styles.container}>
      <StatusBar />
      <Homeheadnavbar navigation ={navigation}/>
      <View style ={styles.BottomNav}>
      <BottomNav navigation ={navigation}/>
      </View>
      <ScrollView>
      <View style={styles.searchbar}>
        <FontAwesome5 name="search" size={35} color="black" />
        <TextInput style={styles.search1} placeholder='search' onChangeText={(text) => { setsearch(text) }} />
      </View>
      {search != '' && <View style={styles.searchresultouter}>
        <FlatList style={styles.searchresultinner}
          data={foodData}
          renderItem={({ item }) => {
            if (item.FOODname.toLowerCase().includes(search.toLocaleLowerCase())) {
              return (
                <View style={styles.searchresult}>
                  <AntDesign name="arrowright" size={24} color="black" />
                  <Text style={styles.searchresulttext} key={item.index} onPress={()=>{
                        openProductPage(item)}}>{item.FOODname}</Text>
                </View>
              )
            }
          }}
        />
      </View>}
      <Catagories navigation ={navigation} />
      <OfferSlider navigation ={navigation} />
      <CardSlider title={"Today's Special"} data={foodData} navigation ={navigation} />
      <CardSlider title={"veg"} data={vegData} navigation ={navigation}/>
      <CardSlider title={"Non-Veg"} data={nonvegData} navigation ={navigation}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#545554',
    // alignItems:'center',


  },
  searchbar: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 10,
    width: '98%',
    backgroundColor: '#f5b013',
    height: 40,
    borderRadius: 10,
    elevation: 30,
    marginLeft: 4,
  },
  search1: {
    fontSize: 20,
  },
  searchresultouter:{
    width:'100%',
    marginHorizontal:30,
    // height: '100%',
   
  },
  searchresultinner:{
    width:'100%',

  },

  searchresult:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    padding:5,
  },

  searchresulttext:{
   marginLeft:10,
   fontSize:18,
   color:'#f5b013',
  },
  BottomNav:{
    position:'absolute',
    bottom:0,
    width:'100%',
    backgroundColor: '#212120',
    zIndex:20,
    height:60,
    justifyContent:'center',
  },
})
export default HomeScreen

