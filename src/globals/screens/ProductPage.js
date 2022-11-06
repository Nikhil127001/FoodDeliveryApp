import { StyleSheet, Text, View, ScrollView,Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import HomeScreen from '../../HomeScreen';
import { Entypo } from '@expo/vector-icons';
import style from './global/style';
import { nonveg, veg } from '../screens/global/style';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {firebase} from "../../../firebase/FirebaseConfig";

const ProductPage = ({navigation,route}) => {
  // calling data from CardSlider of a specific card
  const data = route.params;
  // console.log(data)
  if (route.params === undefined){
    navigation.navigate('HomeScreen')
  }
  // creating hooks for quantity
  const [quantity,setquantity] = useState('1');
  // creating hooks for quantity of addon
  const [addon,setaddon] = useState('0');
  // creating Add to cart function for add to cart button
  const addTocart =()=>{
    // console.log('add to cart')

    //adding add to cart data to firebase by creating a folder or collection" UserCart".
    const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
    // passing addon and quantity to data1 or getting data and addon data and quantity data 
    const data1 ={data,addonQuantity: addon, FoodQuantity: quantity}
    
    // console.log('data1', data1)

    //Adding this data1 to firebase for unique uid to cart folder

    docRef.get().then((doc)=>{
      if (doc.exists) {
        docRef.update({
          cart : firebase.firestore.FieldValue.arrayUnion(data1)
        })
        alert('Added to Cart')
      } else {
        docRef.set({
          cart: [data1],
        })
        alert('Added to Cart')
      }
    })
  }

  const increasequantity = ()=>{
    setquantity((parseInt(quantity)+1).toString())
  }
  const decreasequantity = ()=>{
    if(parseInt(quantity)>1){setquantity((parseInt(quantity)-1).toString())}
    
  }
  const increaseAddonquantity = ()=>{
    setaddon((parseInt(addon)+1).toString())
  }
  const decreaseAddonquantity = ()=>{
    if(parseInt(addon)>0){  setaddon((parseInt(addon)-1).toString())}
  
  }
  return (
    <ScrollView>
      <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}><Entypo name="back" size={30} color="black" style={styles.back}/></TouchableOpacity>
      <View style={styles.container}>
        <View style= {styles.discription}>
          <Image source={{uri: data.foodimageUrl}}style={styles.image}/>
          <View style={styles.nameprice}>
            <Text style ={styles.foodn}>{data.FOODname}</Text>
            <Text style = {styles.foodp}>₹ {data.FOODprice}</Text>
          </View>
         
          <View style={styles.About}>
          <Text style = {styles.foodd}>Food Description</Text>
              <Text style={styles.dis}>{data.FOODdescription}</Text>
              <View style ={styles.vegNonVeg}>
                            {data.FoodType == 'veg' ? <Text style={veg}></Text> : <Text style={nonveg}></Text>}
                            {data.FoodType == 'veg' ? <Text style={styles.vegnonveg}>Veg</Text> : <Text style={styles.vegnonveg}>Non-Veg</Text>}
                            </View>
                            <Text style={styles.foodd}>Restaurant Details</Text>
              <Text style={styles.dis}> {data.Restarauntname}</Text>
              <Text style={styles.dis}>{data.RestarauntEmail}</Text>
              <Text style={styles.dis}>{data.RestarauntaddBuilding},{data.RestarauntaddCity},{data.RestarauntaddPin}</Text>
              <Text style={styles.dis}> Mob No. {data.Restarauntphonenumber}</Text>
             

            </View>
            <View style ={styles.AddToCart}>


            <Text style = {styles.foodd}>FoodQuantity </Text>
            <View style = {styles.btnout}>
            <TouchableOpacity style = {styles.Add} onPress={()=>increasequantity()}>
            <Ionicons name="add" size={35} color='#f5b013' />
            </TouchableOpacity>
            <Text style ={styles.countItem}>
              <Text> {quantity}</Text>
            </Text>
            <TouchableOpacity style = {styles.Add} onPress={()=> decreasequantity()}>
            <AntDesign name="minus" size={35} color='#f5b013'/>
            </TouchableOpacity>
            </View>


            {/* to show whether an item has addon or not we use turnery operator  */}
            {data.FoodAddonPrice != "" &&
            <View style ={styles.AddToCart}>
              <View style={styles.addoncontainer}>
            <Text style = {styles.foodd}>{data.FoodAddon} </Text>
            <Text style = {styles.foodd}>₹{data.FoodAddonPrice}/-</Text>
            </View>
            <View style = {styles.btnout}>
            <TouchableOpacity style = {styles.Add} onPress={()=>increaseAddonquantity()}>
            <Ionicons name="add" size={35} color='#f5b013' />
            </TouchableOpacity>
            <Text style ={styles.countItem}>
              <Text> {addon}</Text>
            </Text>
            <TouchableOpacity style = {styles.Add} onPress={()=>decreaseAddonquantity()}>
            <AntDesign name="minus" size={35} color='#f5b013'/>
            </TouchableOpacity>
            </View>
            </View>}

            
            <Text style ={styles.hr}></Text>

            {data.FoodAddonPrice != ""?
            <View style={styles.addoncontainer}>
            <Text style = {styles.foodd}> Total Amount </Text>
            <Text style = {styles.foodd}>₹{((
              parseInt(data.FOODprice)* parseInt(quantity)
            ) + parseInt(data.FoodAddonPrice)* parseInt(addon)).toString()}/-</Text>
            </View>
            :
            <View style={styles.addoncontainer}>
            <Text style = {styles.foodd}> Total Amount </Text>
            <Text style = {styles.foodd}>₹{((
              parseInt(data.FOODprice)* parseInt(quantity)
            )).toString()}/-</Text>
            </View>
}</View>

            <View style={ styles.bottomView} >

            <View style = {styles.btn}>
            <TouchableOpacity style = {styles.btn0} onPress={()=> addTocart()}>
               <Text style = {styles.btn1}>Add To Cart</Text>
            </TouchableOpacity>
           
            </View>
          

</View>
          </View>
        
        </View>      
    </ScrollView>
  )
}

export default ProductPage

const styles = StyleSheet.create({
  back:{
    backgroundColor: 'white',
    marginLeft:4,
    marginTop:4,
    width:'100%',
    // zIndex:10,
  },
  container:{
    width:'100%',
    backgroundColor: '#545554',
    justifyContent:'center',
    alignItems:'center',
    
  },
  discription:{
    width:'100%',
    height:'100%',
    backgroundColor: '#545554',
    
    alignItems:'center',
  },
  image:{
    width:'100%',
    height:300,
  },
  nameprice:{
    width:'90%',
    flex:0,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  foodn:{
    fontSize:30,
    color:'#f5b013',
    fontWeight:'bold',
    width:'70%',
    marginTop:20,
  },
  About:{
  backgroundColor:'#f5b013',
  width:'95%',
  borderRadius:20,
  
  
  },
  foodp:{
    fontSize:30,
    color:'#f5b013',
    marginLeft:10,
    marginTop:20,
    
  },
  foodd:{
    fontSize:25,
    color:'black',
    marginLeft:10,
    marginTop:20,
    fontWeight:'bold',
    
  },
  dis:{
    fontSize:18,
    color:'black',
    marginLeft:10,
    marginTop:20,
    
  },
  vegnonveg:{
    color:'black',
    marginLeft:5,
    fontWeight:'bold'
  },
  vegNonVeg:{
      flex:0,
      flexDirection:'row',
      marginTop:10,
      marginLeft:10,
      marginBottom:10,
      backgroundColor:'white',
      width:'25%',
      padding:5,
      borderRadius:10,

  },
  bottomView:{
 
    width: '100%', 
    height: 70, 
    backgroundColor: '#212120', 
    justifyContent: 'center', 
    alignItems: 'center',
    position:'relative',

    bottom: 0
  },
  AddToCart:{
    backgroundColor:'white',
    width:'95%',
    borderRadius:20,
    marginTop:20,
    marginBottom:20,
    alignItems:'center',
    justifyContent:'center',
    },
    btn:{
      width:"95%",
      flex:0,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
              
  },
  btn0:{
      width:"100%",
      height:50,
      flex:0,
      flexDirection:'row',
      borderRadius:20,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#f5b013',
      elevation:10,
  },
  btn1:{
      borderRadius:10,
      color:'black',
      fontWeight:'bold',
      alignItems:'center',
      justifyContent:'center',
      alignItems:"center",
      fontSize:18,
  },
  Add:{
    width:"15%",
    height:38,
    flex:0,
    flexDirection:'row',
    borderRadius:40,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#545554',
    elevation:10,
},
countItem:{
  height:40,
  width:50,
  backgroundColor:'white',
  alignItems:'center',
  fontSize:30,
  Color:'#f5b013',
  borderColor:'black',
  borderWidth:1,
  
  borderRadius:10,
},
btnout:{
  width:"60%",
  flex:0,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  marginBottom:10,
  marginTop:10,
          
},
FoodQuantity:{
  marginBottom:20,
  fontSize:22,
  
},
addoncontainer:{
  flex:0
,
flexDirection:'row'},

hr:{
  width:'100%',
  borderBottomColor:'black',
  borderBottomWidth:2,
  marginBottom:10,
},
   
})