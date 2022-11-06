import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../firebase/FirebaseConfig';
import { Entypo } from '@expo/vector-icons';
import BottomNav from './BottomNavbar';
import style from '../globals/screens/global/style';
import { MaterialIcons } from '@expo/vector-icons';

const UserCart = ({ navigation }) => {
    const [cartdata, setcartdata] = useState(null);
    const [totalcost, settotalcost] = useState('0');

    const getCartData = async () => {
        //getting add to cart data from firebase from UserCart
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);


        //getting this data from firebase for unique uid from cart folder

        docRef.get().then((doc) => {
            if (doc.exists) {
                const data = JSON.stringify(doc.data());
                setcartdata(data);

            } else {
                console.log('No such documents')
            }
        })
    }

    useEffect(() => {
        getCartData();
    }, []);

    // calculation for total Cart Amount by Getting data from firebase convert it into int and then add them to get total amount.

    useEffect(() => {
        if (cartdata != null) {
            const foodprice = JSON.parse(cartdata).cart;
            let totalFoodPrice = 0;
            foodprice.map((item)=>{
                totalFoodPrice = (parseInt(item.data.FOODprice) * parseInt(item.FoodQuantity)) + (parseInt(item.data.FoodAddonPrice)* parseInt(item.addonQuantity) )+ totalFoodPrice;
            })
           
            settotalcost(JSON.stringify(totalFoodPrice))
        }
    }, [cartdata]);

    console.log(totalcost)
    // to delete an item from cart
    const deleteItem = (item) => {
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
        docRef.update({
            cart: firebase.firestore.FieldValue.arrayRemove(item)
        })
        getCartData();
    }

    // console.log(cartdata);
    return (
        <View style ={styles.container}>

            <TouchableOpacity style={styles.back}>
                <View>
                    <Entypo name="back" size={30} color="black"  onPress={() => navigation.navigate('HomeScreen')} />
                </View>
            </TouchableOpacity>


            <View style={styles.BottomNav}>
                <BottomNav navigation={navigation} />
            </View>

            <View style ={styles.container}>
                <Text style ={styles.heading}>Your Cart</Text>
                {/* show data if and only if cartdata has no items in folder UserCart and there is no folder as UserCart */}
                {cartdata == null || JSON.parse(cartdata).cart.length == 0 ?
                <Text style ={styles.emptycart}>Your Cart is Empty</Text>


                :

               <FlatList style ={styles.cardlist} data = {JSON.parse(cartdata).cart}
               renderItem={
                ({item}) => {
                    return(
                        <View style ={styles.cartcard}>
                        <Image source ={{uri: item.data.foodimageUrl}} style ={styles.cartimg}/>

                        <View style ={styles.cartiteminfo}>
                          <Text style = {styles.foodn}>{item.data.FOODname}</Text>
                          <View style = {styles.inrow}>
                          <Text style = {styles.foodp}>₹{item.data.FOODprice}/for One</Text>
                          <Text style = {styles.foodp}>Quantity: {item.FoodQuantity}</Text>
                          </View>
                          {item.addonQuantity > 0 && 
                           <View>
                            <Text style = {styles.foodn}>{item.data.FoodAddon}</Text>
                           <View style = {styles.inrow}>
                           <Text style = {styles.foodp}>₹{item.data.FoodAddonPrice}/for One</Text>
                           <Text style = {styles.foodp}>Quantity: {item.addonQuantity}</Text>
                           </View>
                           </View>}
                           <TouchableOpacity style ={styles.deletebtn} onPress={()=> deleteItem(item)}>
                           <MaterialIcons name="delete" size={24} color="black" />
                           <Text>Delete</Text>
                           </TouchableOpacity>
                        </View>
                        </View>
                    )
                    }
                }
               />
    }
        <View style = {styles.btn}>
            <Text style={styles.totalamt}>
                Total Amount:
            </Text>
            <Text style={styles.totalamt}>
            ₹{totalcost}
            </Text>
            <TouchableOpacity style = {styles.btn0} onPress={()=> navigation.navigate('PlaceOrder',{cartdata})}>
               <Text style = {styles.btn1}>Place Order</Text>
            </TouchableOpacity>
           
            </View>
            </View>

        </View>
    )
}

export default UserCart

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        alignItems:'center',
    },
    heading:{
        fontSize:22,
        fontWeight:'bold',
    },
    back: {

        marginLeft: 4,
        marginTop: 4,
        width: '100%',
        // zIndex:10,
    },
    BottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#212120',
        zIndex: 20,
        height: 60,
        justifyContent: 'center',
    },
    cardlist:{
        width:'100%',
        height:200,
        
    },
    cartcard:{
        width:'98%',
        height:150,
        marginTop:10,
        elevation:10,
        backgroundColor: '#f5b013',
        flex:0,
        flexDirection:'row',
        borderRadius:10,
        marginLeft:4,
        color:'white',
    },
    cartimg:{
        width:'40%',
        height:'100%',
        borderRadius:10,
    },
    cartiteminfo:{
        marginLeft:10,
    },
    foodn:{
        fontSize:18,
        fontWeight:'bold',
        width:'80%',
    },
    foodp:{
        fontWeight:'bold',
        
    },
    inrow:{
        flex:0,
        flexDirection:'row',
        width:'60%',
        justifyContent:'space-between'
    },

    deletebtn:{
        flex:0,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:0.5,
        width:'23%',
        borderRadius:10,
        marginTop:10,
    },
    btn:{
        width:"95%",
        flex:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:100,
        height:60,
        borderTopWidth:1,
                
    },
    btn0:{
        width:"40%",
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
    totalamt:{
        fontSize:18,
        fontWeight:'bold',
    },
    
})