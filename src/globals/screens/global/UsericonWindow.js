import React, { useEffect, useState } from 'react'
import { StyleSheet,View,TouchableOpacity,Text, } from 'react-native'
// checking if a user logged in or not
import {firebase} from '../../../../firebase/FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

    

const UsericonWindow = ({navigation}) => {
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

    console.log(userloggeduid);
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
     }, [userloggeduid])

    //  console.log(userdata);

     const logoutuser = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            alert('you are logged out');
            navigation.navigate('Loginscreen');
        }).catch((error) => {
            // An error happened.
            alert('Server Issue');
        });
    }
     
  return (
    <View style={style.container1}>
                        <View style={style.heading}>
                        <Text style={style.text}>Your Profile</Text>
                        </View>
                        <Text style={style.success}>Name: {userdata ? <Text >
                        {userdata.name}
                    </Text> : 'loading'}</Text>
                        <Text style={style.success}>Email Id : {userdata ? <Text >{userdata.email}</Text> : 'loading'}</Text>
                        <Text style={style.success}>Address :{userdata ? <Text > {userdata.address}</Text> : 'loading'}</Text>
                        <Text style={style.success}>Phone Number:{userdata ? <Text > {userdata.phone}</Text> : 'loading'}</Text>
                        
                        <TouchableOpacity style={style.btn0} onPress={() => navigation.navigate('HomeScreen')}>
                        <FontAwesome name="home" size={24} color="black" />
                        <Text>Home</Text>
                        </TouchableOpacity>  
                        <TouchableOpacity style={style.btn0} onPress={() => logoutuser()}>
                        <Entypo name="log-out" size={24} color="black" />
                        <Text>Log Out</Text>
                        </TouchableOpacity>  
                        
                    
                     </View>
  )
}

const style = StyleSheet.create({
    container1: {

        backgroundColor: '#212120',
        
        justifyContent: 'center',
        width: "100%",
        height:'100%',
        borderColor:'#5dee22',
        borderWidth:2,
    },
    bt:{
        width:'100%',
        flex:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
  
    btn0: {
        width: "95%",
        height: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5dee22',
        margin: 10,
        borderColor: 'black',
    },
    btn1:{
        borderRadius:20,
        color:'black',
        fontWeight:'1000',
        alignItems:'center',
        justifyContent:'center',
        alignItems:"center",
        fontSize:18,
    },
    success:{
        marginTop:10,
        color:'#5dee22',
        fontSize:17,
        marginLeft:80,
        fontWeight:'bold',

        
    },
    heading:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:30,
        color:'#5dee22',
        fontWeight:'bold',
        marginBottom:30,
    },
   
})

export default UsericonWindow