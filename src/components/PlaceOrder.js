import { StyleSheet, Text, View,TouchableOpacity, FlatList,Image, ScrollView,} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import BottomNav from './BottomNavbar';
import { firebase } from '../../firebase/FirebaseConfig';

const PlaceOrder = ({navigation,route}) => {
  const {cartdata} = route.params;
  const[orderData,SetorderData] = useState([]);
  const[totalcost,SettotalCost] = useState('0');

  useEffect(()=>{
    SetorderData(JSON.parse(cartdata))
  },[cartdata]);

  useEffect(() => {
    if (cartdata != null) {
        const foodprice = JSON.parse(cartdata).cart;
        let totalFoodPrice =0;
        foodprice.map((item)=>{
            totalFoodPrice = (parseInt(item.data.FOODprice)* parseInt(item.FoodQuantity)) + (parseInt(item.data.FoodAddonPrice)* parseInt(item.addonQuantity))+ totalFoodPrice;
        })

      SettotalCost(JSON.stringify(totalFoodPrice))
    }
}, [cartdata]);

  // console.log(orderData);

  const[userloggeduid,setuserloggeduid] = useState([]);
  const [userdata,setuserdata] = useState(null);
    useEffect(()=>{
        const checklogin =() => {
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                    setuserloggeduid(user.uid);
                }
                else{
                    setuserloggeduid(null);
                    navigation.navigate('Loginscreen');
                }
            })
        }
        checklogin()
    },[])

    // console.log(userloggeduid);
     useEffect(()=>{

        const getuserdata = async() => {
            const docRef = firebase.firestore().collection('UserData').where('uid','==',userloggeduid)
            const doc = await docRef.get();
            if (!doc.empty) {
                doc.forEach((doc)=>{
                    setuserdata(doc.data());
                })
                
            }
            else{
                // navigation.navigate('Loginscreen')
                console.log('no data found')

            }
        }


        getuserdata();
     }, [userloggeduid]);

    //  console.log(userdata)

    const MakePayment = ()=>{
      const docRef = firebase.firestore().collection('UserOrders').doc(new Date().getTime().toString());


      docRef.set({
        orderid: docRef.id,
        orderdata: orderData.cart,
        orderstatus: 'Pending',
        Ordercost: totalcost,
        orderData:firebase.firestore.FieldValue.serverTimestamp(),
        orderaddress: userdata.address,
        orderphone: userdata.address,
        orderemail: userdata.email,
        ordername: userdata.name,
        orderuseruid: userloggeduid,
        orderpayment: 'online',
        orderTotalCost: totalcost,
        paymentStatus:'paid',
      }).then(()=>{
        alert('Order Placed')
      })
    }

  return (
    
    <View style = {styles.container}>
      <TouchableOpacity style={styles.back}>
                <View>
                    <Entypo name="back" size={30} color="black"  onPress={() => navigation.navigate('UserCart')} />
                </View>
            </TouchableOpacity>

            

            <View style={styles.BottomNav}>
            <View style = {styles.btn}>
            <Text style={styles.totalamt}>Total Amount:</Text>
            <Text style={styles.totalamt}>
            ₹{totalcost}
            </Text>
            <TouchableOpacity style = {styles.btn0} onPress={()=>MakePayment()}>
               <Text style = {styles.btn1}>Make Payment</Text>
            </TouchableOpacity>
            </View>
                <BottomNav navigation={navigation} />
            </View>
            <Text style ={styles.heading}>Order Summary</Text>
            <View style = {styles.all}>
            <FlatList style={styles.OrderSummery} data ={orderData.cart} renderItem={({item})=>{
              return(
                <View style ={styles.cartcard}>
                        

                        <View style ={styles.cartiteminfo}>
                          <Text style = {styles.foodn}>{item.data.FOODname}</Text>
                          <View style = {styles.inrow}>
                          <Text style = {styles.foodp}>₹{item.data.FOODprice}/for One</Text>
                          <Text style = {styles.foodp}>Quantity: {item.FoodQuantity}</Text>
                          <Text style = {styles.foodp}>₹{(parseInt(item.data.FOODprice)* parseInt(item.FoodQuantity))}</Text>
                          </View>
                          {item.addonQuantity > 0 && 
                           <View>
                            <Text style = {styles.foodn}>{item.data.FoodAddon}</Text>
                           <View style = {styles.inrow}>
                           <Text style = {styles.foodp}>₹{item.data.FoodAddonPrice}/for One</Text>
                           <Text style = {styles.foodp}>Quantity: {item.addonQuantity}</Text>
                           <Text style = {styles.foodp}>₹{(parseInt(item.data.FoodAddonPrice)* parseInt(item.addonQuantity))}</Text>
                           </View>
                           </View>} 
                        </View>
                        
                        </View>
                        
              )
            }}/>


            
              <View style = {styles.info}>
            <View style={styles.heading}>
                        <Text style={styles.text}>Your Details</Text>
                        </View>
                        <View style = {styles.details}>
                        <Text style={styles.success}>Name: {userdata ? <Text > {userdata.name}</Text> : 'loading'}</Text>
                        <Text style={styles.success}>Email Id : {userdata ? <Text >{userdata.email}</Text> : 'loading'}</Text>
                        <Text style={styles.success}>Address :{userdata ? <Text > {userdata.address}</Text> : 'loading'}</Text>
                        <Text style={styles.success}>Phone Number:{userdata ? <Text > {userdata.phone}</Text> : 'loading'}</Text>
                        </View>
            </View>
            
            </View>
            </View>
    
  )
}

export default PlaceOrder

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    alignItems:'center',
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
  height: 120,
  justifyContent: 'center',
  
},
cardlist:{
  width:'100%',
  height:200,
  
},
all:{},
OrderSummery:{
  backgroundColor: '#f5b013',
  width:'100%',
  height:500,
  borderRadius:15,
},
cartcard:{
  width:'98%',
  height:100,
  marginTop:10,
  flex:0,
  flexDirection:'row',
  borderRadius:10,
  marginLeft:4,
  color:'white',
},

cartiteminfo:{
  marginLeft:10,
},
foodn:{
  fontSize:18,
  fontWeight:'bold',
  color:'red',
},
foodp:{
  fontWeight:'bold',
  marginBottom:10,
  width:'33%',
},
inrow:{
  flex:0,
  flexDirection:'row',
  width:'100%',
  justifyContent:'space-between'
},

deletebtn:{
  flex:0,
  flexDirection:'row',
  alignItems:'center',
  borderWidth:0.5,
  width:'23%',
  borderRadius:10,
},
heading:{
  fontSize:25,
  fontWeight:'bold',
},
btn:{
  width: '100%',
  backgroundColor: '#212120',
  height: 60,
  justifyContent: 'center',
  flex:0,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  borderBottomColor:'white',
  borderBottomWidth:1,
},

btn0:{
  width:"40%",
  height:50,
  flex:0,
  flexDirection:'row',
  borderRadius:20,
  alignItems:'center',
  justifyContent:'center',
  elevation:10,
  backgroundColor: '#f5b013',
  
  marginRight:10,
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
  marginLeft:10,
  color: '#f5b013',
},

info:{
  height:200,
  marginBottom:200,
  alignItems:'center',
},
success:{
  fontSize:18,
  marginLeft:20,
},

text:{
  fontSize:25,
  fontWeight:'bold',
},
})