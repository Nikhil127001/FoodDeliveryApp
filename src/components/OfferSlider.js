import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const OfferSlider = () => {
  return (
    <View style={styles.main}>
      <View style = {styles.offerSlider}>
        <Swiper autoplay={true} autoplayTimeout={4} showsButtons={true} dotColor={'#212120'} activeDotColor={'#f5b013'}
        nextButton={<Text style={styles.next}></Text>}
        prevButton={<Text style={styles.prev}></Text>}>
            <View style = {styles.slide}>
                <Image source={require('../../images/DISH2.png',)} style = {styles.Image}/>
            </View>
            <View style = {styles.slide}>
                <Image source={require('../../images/DISH4.png',)} style = {styles.Image}/>
            </View>
            <View style = {styles.slide}>
                <Image source={require('../../images/DISH5.png',)} style = {styles.Image}/>
            </View>
            <View style = {styles.slide}>
                <Image source={require('../../images/DISH3.png',)} style = {styles.Image}/>
            </View>
            <View style = {styles.slide}>
                <Image source={require('../../images/DISH1.png',)} style = {styles.Image}/>
            </View>
        </Swiper>
      </View>
    </View>
  )
}

export default OfferSlider

const styles = StyleSheet.create({
    offerSlider:{
        height:200,
        width:"100%",
        alignItems:"center",
        justifyContent:'center',
        paddingHorizontal:10,
        marginVertical:10,

    },
    slide:{
        width:'100%',
        height:200,
        alignItems:'center',
        justifyContent:'center',
        
    },
    
    Image:{
        width:'100%',
        height:'100%',
        borderRadius:20,
        resizeMode:'contain',
    
    },
})