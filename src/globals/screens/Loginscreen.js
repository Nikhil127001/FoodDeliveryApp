import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Dimensions, ImageBackground } from 'react-native'
import { colors , btn1,btn0 } from '../screens/global/style'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../HomeScreen';
import { firebase } from '../../../firebase/FirebaseConfig';

const screenHeight = Dimensions.get('window').height;
        const screenWidth = Dimensions.get('window').width;

const
    Loginscreen = ({navigation}) => {
        const [emailfocus, setEmailfocus] = useState(false);
        const [passwordfocus, setPasswordfocus] = useState(false);
        const [showpassword, setShowpassword] = useState(false);

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [custError, setCustError] = useState('');

        const handleLogin =()=>{
            firebase.auth().signInWithEmailAndPassword(email,password).then((userCredential)=>{
                var user = userCredential.user;
                console.log('Logged In successfully');
                // console.log(user);
                navigation.navigate('HomeScreen')
            })
            .catch((error)=>{
                var errormsg = error.message;
                // console.log(errormsg);
                if (errormsg === 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
                    setCustError('Please enter a valid Email address')
                    
                } else {
                    setCustError('Incorrect Email or Password')
                }

            })
        }

        return (
            <View style={style.container}>
                <ImageBackground
                        source={require('../../../images/backgroundimg.png')}
                        resizeMode="stretch"
                        style={style.img}></ImageBackground>
                <Text style={style.head1}>Sign In</Text>
                {custError != '' && <Text style={style.errormsg}>{custError} </Text>}
                <View style={style.input}>
                    <AntDesign name="user" size={24} color={emailfocus === true ? colors.text2 : colors.text3} />
                    <TextInput style={style.inputBox} placeholder='Email Id'
                        onFocus={() => {
                            setEmailfocus(true)
                            setPasswordfocus(false)
                            setCustError('')
                            
                        }}
                        onChangeText={(text) => setEmail(text)}/>
                </View>

                <View style={style.input}>
                    <Ionicons name="key" size={24} color={passwordfocus === true ? colors.text2 : colors.text3} />
                    <TextInput style={style.inputBox} placeholder='Password' 
                    onFocus={() => {
                        setEmailfocus(false)
                        setPasswordfocus(true)
                        setCustError('')
                    }}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={showpassword === false ? true : false} />
                    <Ionicons name={showpassword == false ? "eye-off" : "eye"} size={24} color="black" onPress={() => setShowpassword(!showpassword)} />
                </View>

                <TouchableOpacity style={btn0} onPress={()=> handleLogin()}>
                    <Text style={btn1}>Sign In</Text>
                </TouchableOpacity>

                <Text style = {style.forgot}>Forgot Password</Text>
                <Text style ={style.or}>OR</Text>
                <Text style ={style.gftext}>Sign In With</Text>
                <View style={style.gf}>
                    <TouchableOpacity><View style={style.gficon}>
                    <AntDesign name="google" size={30} color='#f5b013' /></View></TouchableOpacity>
                    <TouchableOpacity><View style={style.gficon}><AntDesign name="facebook-square" size={30} color='#f5b013' />
                    </View></TouchableOpacity>
                   
                </View>
                <Text style={style.signup} onPress={()=> navigation.navigate('Signupscreen')}>Don't have any Account? Sign Up</Text>
            </View>
        )
    }

const style = StyleSheet.create({
    container: {
        flex: 1,
        
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    img: {
        height: screenHeight,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        zIndex:-1,
        opacity:0.8,
      },
    head1: {
        fontSize: 40,
        color: colors.col1,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: '400',
    },
    input: {
        flexDirection: 'row',
        width: '80%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 10,
        elevation: 20,

    },

    inputBox: {
        width: '80%',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
    },


    forgot:{
        color:'#5dee22',
        marginTop: 20,
        marginBottom:10,
    },
    or:{
        color:'#5dee22',
        marginTop: 20,
        marginBottom:10,
        fontWeight:'bold'
    },
    gftext:{
        color:'#5dee22',
        marginTop: 20,
        marginBottom:10,
        fontSize:20,
    },

    gficon:{
        borderWidth:2,
        borderColor:'#5dee22',
        margin:10,
        elevation:30,
    },

    gf:{
        flex:0,
        flexDirection:'row',
    },
    signup:{
        marginTop:10,
       fontSize:15,
       color:'#5dee22',
      },
      errormsg: {
        color: '#5dee22',
        marginTop: 5,
        marginBottom: 10,
        fontSize: 14,
        borderColor: '#5dee22',
        borderWidth: 1,
        paddingLeft: 6,

    },
})

export default Loginscreen