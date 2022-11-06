import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ImageBackground } from 'react-native'
import { colors, btn1, btn0 } from '../screens/global/style'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';




import { firebase } from '../../../firebase/FirebaseConfig';

const screenHeight = Dimensions.get('window').height;
        const screenWidth = Dimensions.get('window').width;

const
    Signupscreen = ({ navigation }) => {
        const [emailfocus, setEmailfocus] = useState(false);
        const [phonefocus, setphonefocus] = useState(false);
        const [namefocus, setnamefocus] = useState(false);
        const [passwordfocus, setPasswordfocus] = useState(false);
        const [showpassword, setShowpassword] = useState(false);
        const [showcpassword, setShowcpassword] = useState(false);
        const [cpasswordfocus, csetPasswordfocus] = useState(false);
        // taking form data
        const [email, setEmail] = useState('');
        const [name, setname] = useState('');
        const [phone, setphone] = useState('');
        const [password, setpassword] = useState('');
        const [cpassword, setcpassword] = useState('');
        const [address, setaddress] = useState('');
        const [custError, setCustError] = useState('');
        const [success, setSuccessmsg] = useState(null);

        

        const handleSignUp = () => {

            if (password != cpassword) {
                setCustError('Password Do Not Match');
                return;
            }
            else if (phone.length != 10) {
                setCustError('Length of Phone Number should be 10');
                return;
            }
            else if (password.length <= 6) {
                setCustError('password should be more than 6 characters');
                return;
            }
            try {
                firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredentials) => {
                    // console.log(userCredentials?.user.uid)
                    console.log('user created');

                    if (userCredentials?.user.uid) {
                        const userRef = firebase.firestore().collection('UserData')

                        userRef.add({
                            email: email,
                            name: name,
                            phone: phone,
                            password: password,
                            // cpassword: cpassword,
                            address: address,
                            uid: userCredentials?.user.uid
                        }).then(() => {
                            console.log('data added to firestore')
                            setSuccessmsg('user created Successfully')
                        })
                    }

                })
                    .catch((error) => {
                        console.log('sign up firebase error', error.message)
                        if (error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
                            setCustError('Email already exists')

                        } else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
                            setCustError('Invalid Email')

                        }
                        else if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                            setCustError('Password should be at least 6 characters')
                        }

                        else {
                            setCustError(error.message)
                        }
                    })
            } catch (error) {
                console.log('sign up system error', error.message)

            }
        }

        return (
            <View>
                {success == null ? <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <ImageBackground
                        source={require('../../../images/backgroundimg.png')}
                        resizeMode="stretch"
                        style={style.img}></ImageBackground>
                    <View style={style.container}>
                        <Text style={style.head1}>Sign Up</Text>
                        {custError != '' && <Text style={style.errormsg}>{custError} </Text>}
                        <View style={style.input}>
                            <AntDesign name="user" size={24} color={namefocus === true ? colors.text2 : colors.text3} />
                            <TextInput style={style.inputBox} placeholder='Enter Your Name'
                                onFocus={() => {
                                    setEmailfocus(false)
                                    setnamefocus(true)
                                    setPasswordfocus(false)
                                    setphonefocus(false)
                                    csetPasswordfocus(false)
                                    setCustError('')
                                }} onChangeText={(text) => setname(text)} />
                        </View>



                        <View style={style.input}>
                            <Entypo name="phone" size={24} color={phonefocus === true ? colors.text2 : colors.text3} />
                            <TextInput style={style.inputBox}   keyboardType = 'numeric' placeholder='Enter Phone Number'
                                onFocus={() => {
                                    setEmailfocus(false)
                                    setnamefocus(false)
                                    setPasswordfocus(false)
                                    setphonefocus(true)
                                    csetPasswordfocus(false)
                                    setCustError('')
                                }}
                                onChangeText={(Number) => setphone(Number)} />
                        </View>



                        <View style={style.input}>
                            <MaterialIcons name="email" size={24} color={emailfocus === true ? colors.text2 : colors.text3} />
                            <TextInput style={style.inputBox} placeholder='Email Id'
                                onFocus={() => {
                                    setEmailfocus(true)
                                    setnamefocus(false)
                                    setPasswordfocus(false)
                                    setphonefocus(false)
                                    csetPasswordfocus(false)
                                    setCustError('')
                                }}
                                onChangeText={(text) => setEmail(text)} />
                        </View>



                        <View style={style.input}>
                            <Ionicons name="key" size={24} color={passwordfocus === true ? colors.text2 : colors.text3} />
                            <TextInput style={style.inputBox} placeholder='Password'
                                onFocus={() => {
                                    setEmailfocus(false)
                                    setPasswordfocus(true)
                                    csetPasswordfocus(false)
                                    setnamefocus(false)
                                    setphonefocus(false)
                                    setCustError('')
                                }}
                                onChangeText={(text) => setpassword(text)}
                                secureTextEntry={showpassword === false ? true : false} />
                            <Ionicons name={showpassword == false ? "eye-off" : "eye"} size={24} color="black" onPress={() => setShowpassword(!showpassword)}
                            />
                        </View>



                        <View style={style.input}>
                            <Ionicons name="key" size={24} color={cpasswordfocus === true ? colors.text2 : colors.text3} />
                            <TextInput style={style.inputBox} placeholder='Confirm Password'
                                onFocus={() => {
                                    setEmailfocus(false)
                                    setPasswordfocus(false)
                                    csetPasswordfocus(true)
                                    setnamefocus(false)
                                    setphonefocus(false)
                                    setCustError('')
                                }}
                                onChangeText={(text) => setcpassword(text)}
                                secureTextEntry={showcpassword === false ? true : false} />
                            <Ionicons name={showcpassword == false ? "eye-off" : "eye"} size={24} color="black" onPress={() => setShowcpassword(!showcpassword)}
                            />
                        </View>


                        <Text>Please Enter Your Address</Text>
                        <View style={style.input}>

                            <TextInput style={style.inputBox} placeholder='Address'
                                onFocus={() => {
                                    setEmailfocus(false)
                                    setPasswordfocus(false)
                                    csetPasswordfocus(false)
                                    setnamefocus(false)
                                    setphonefocus(false)
                                    setCustError('')
                                }} onChangeText={(text) => setaddress(text)} />
                        </View>



                        <TouchableOpacity style={btn0} onPress={() => handleSignUp()}>
                            <Text style={btn1} >Sign Up</Text>
                        </TouchableOpacity>

                        <Text style={style.forgot}>Forgot Password</Text>
                        <Text style={style.or}>OR</Text>
                        <Text style={style.gftext}>Sign In With</Text>
                        <View style={style.gf}>


                            <TouchableOpacity><View style={style.gficon}>
                                <AntDesign name="google" size={30} color='#f5b013' /></View></TouchableOpacity>
                            <TouchableOpacity><View style={style.gficon}><AntDesign name="facebook-square" size={30} color='#f5b013' />
                            </View></TouchableOpacity>
                        </View>


                        <Text style={style.signup} onPress={() => navigation.navigate('Loginscreen')}>Already have an Account? Sign In</Text>
                    </View>
                </ScrollView>
                    :
                    <View style={style.container1}>
                        <Text style={style.success}>{success}</Text>
                        <View style={style.bt}>
                            <TouchableOpacity style={style.btn0} onPress={() => navigation.navigate('Loginscreen')}>
                                <Text style={style.btn1}>Sign In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.btn0} onPress={() => setSuccessmsg(null)}>
                                <Text style={style.btn1}>Go Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                }
            </View>

        )
    }

const style = StyleSheet.create({
    container: {

        
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: 860,

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
    container1: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: '100%',
        backgroundColor:'black',
    },
    bt: {
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head1: {
        marginTop: 60,
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


    forgot: {
        color: '#5dee22',
        marginTop: 5,
        marginBottom: 10,
    },
    or: {
        color: '#5dee22',
        marginTop: 5,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    gftext: {
        color: '#5dee22',
        marginTop: 5,
        marginBottom: 10,
        fontSize: 20,
    },

    gficon: {
        borderWidth: 2,
        borderColor: '#5dee22',
        margin: 10,
        elevation: 30,
    },

    gf: {
        flex: 0,
        flexDirection: 'row',
    },

    signup: {
        marginTop: 10,
        fontSize: 15,
        color: '#5dee22',
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
    btn0: {
        width: "30%",
        height: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5dee22',
        margin: 10,
        borderColor: 'black',
    },
    btn1: {
        borderRadius: 20,
        color: 'black',
        fontWeight: '1000',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: "center",
        fontSize: 18,
    },
    success: {
        marginTop: 100,
        color: '#5dee22',
        fontSize: 20,
        marginBottom: 50,
    },
})


export default Signupscreen