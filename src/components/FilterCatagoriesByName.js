import { StyleSheet, Text, View ,FlatList,TouchableOpacity,Image, ScrollView} from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react'
import { nonveg, veg } from '../globals/screens/global/style'
import CatagoriesSlider from './CatagoriesSlider'
import { firebase } from '../../firebase/FirebaseConfig'

const FilterCatagories= ({navigation,Data}) => {
  const [foodData, setfoodData] = useState([]);
  const [BurgerData, setBurgerData] = useState([]);
  const [PizzaData, setPizzaData] = useState([]);
  const [JuiceData, setJuiceData] = useState([]);
  const [NonVegData, setNonVegData] = useState([]);
  const [FruitData, setFruitData] = useState([]);
  const [DesertData, setDesertData] = useState([]);
  const [ChineaseData, setChineaseData] = useState([]);
  const[data, setdata] = useState('');

  const foodRef = firebase.firestore().collection('FoodData')

  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setfoodData(snapshot.docs.map(doc => doc.data()))
    })
  }, [])
  useEffect(() => {
    setBurgerData(foodData.filter(item => item.FOODcategories == 'Burger'))
    setPizzaData(foodData.filter(item => item.FOODcategories == 'Pizza'))
    setJuiceData(foodData.filter(item => item.FOODcategories == 'Juice'))
    setNonVegData(foodData.filter(item => item.FOODcategories == 'Non-Veg'))
    setFruitData(foodData.filter(item => item.FOODcategories == 'Fruit -Salade'))
    setDesertData(foodData.filter(item => item.FOODcategories =='Deserts' ))
    setChineaseData(foodData.filter(item => item.FOODcategories == 'Chinease-Food'))

  }, [foodData])

  return (
    <ScrollView style={styles.container}>
      
        <CatagoriesSlider title={'Burgers'} data={BurgerData} navigation={navigation} data1 ={Date}/>

      <CatagoriesSlider title={'Pizza'} data={PizzaData} navigation={navigation}/>
      <CatagoriesSlider title={'Juice'} data={JuiceData} navigation={navigation}/>
      <CatagoriesSlider title={'Deserts'} data={DesertData} navigation={navigation}/>
      <CatagoriesSlider title={'Fruit -Salade'} data={FruitData} navigation={navigation}/>
      <CatagoriesSlider title={'Chinease-Food'} data={ChineaseData} navigation={navigation}/>
      <CatagoriesSlider title={'Non-Veg'} data={NonVegData} navigation={navigation}/>
</ScrollView>

  )
}

export default FilterCatagories

const styles = StyleSheet.create({
  
})