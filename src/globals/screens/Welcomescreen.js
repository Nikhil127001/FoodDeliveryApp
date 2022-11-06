import React from 'react'
import { StyleSheet, Text, View, Image,ImageBackground, TouchableOpacity, Button , Dimensions} from 'react-native'
import logo from '../../../images/logo.png'
import style, { colors,hr80, btn1, } from './global/style'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Welcomescreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ImageBackground
        source={require('../../../images/backgroundimg.png')}
        resizeMode="stretch"
        style={styles.img}></ImageBackground>
            <Text style={styles.title}>Welcome To Orange Chilli Restro </Text>
            <View style={hr80}/>
            <View style={styles.logout}>
                <Image style={styles.logoc} source={logo} />
            </View>
            <View style = {styles.btn}>
            <TouchableOpacity style = {styles.btn0} onPress={()=>navigation.navigate('Signupscreen')}>
               <Text style = {styles.btn1}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.btn0} onPress={()=>navigation.navigate('Loginscreen')}>
               <Text style = {styles.btn1}>Log In</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.out}>
            <Text style={styles.signup}>Welcome to our place. </Text>
            <Text style={styles.signup}> You will find happiness and food here.</Text>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",
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
    
    title:{
        fontSize:40,
        color: colors.col1,
        textAlign:'center',
        marginVertical: 10,
        fontWeight:'400',
        borderColor:'white',
        borderWidth:1,
        textShadowColor:'black',
        textShadowOffset:{width: 2, height:1},
        textShadowRadius:10,
        
    },

    logoc: {
        width: 225,
        height: 200,
      
    },
    btn:{
        width:"30%",
        flex:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,        
    },
    btn0:{
        width:"100%",
        height:50,
        flex:0,
        flexDirection:'row',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.col1,
        margin:10,
        borderColor:'black',
        borderWidth:2,
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
    signup:{
        marginTop:20,
       fontSize:20,
       color:'#5dee22',
      
      },

    out:{ justifyContent:'flex-end',
    alignItems:'center',
    width:"100%",
},
});

export default Welcomescreen