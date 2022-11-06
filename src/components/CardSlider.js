import { FlatList, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { nonveg, veg } from '../globals/screens/global/style'

const CardSlider = ({ title, data ,navigation}) => {
    console.log(title)

    const openProductPage =(item) =>{
        // console.log(item)
        navigation.navigate('ProductPage',item)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.cardouthead}>{title}</Text>

            <FlatList style={styles.cardsout}
                 horizontal
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity key={item.index} onPress={()=>{
                        openProductPage(item)
                    }}>
                        <View style={styles.card}>
                        <View style={styles.s1}>
                            <Image source={{
                                uri: item.foodimageUrl
                            }} style={styles.cardimgin} />
                        </View>
                        <View style={styles.s2}>
                            <Text style={styles.txt1}>{item.FOODname}</Text>
                            <View style ={styles.vegNonVeg}>
                            {item.FoodType == 'veg' ? <Text style={veg}></Text> : <Text style={nonveg}></Text>}
                            {item.FoodType == 'veg' ? <Text style={styles.vegnonveg}>Veg</Text> : <Text style={styles.vegnonveg}>Non-Veg</Text>}
                            </View>
                            
 </View>
                            <View style={styles.s2in}>
                                <Text style={styles.txt2}>Rs.{item.FOODprice}</Text>
                                <TouchableOpacity key={item.index} onPress={()=>{
                        openProductPage(item)}}> 
                                    <Text style={styles.buybtn}>
                                        <Text>Buy Now</Text>
                                    </Text>
                                    </TouchableOpacity>
                            </View>
                       
                      
                    </View>
                    </TouchableOpacity>
                    
                )}
            />
        </View>
    )
}

export default CardSlider

const styles = StyleSheet.create({
    container: {
        
        width: '100%',
       
    },


    cardsout:{
        width:'97%',
        marginBottom:10,
     


    },
    card:{
        backgroundColor:'#212120',
        marginBottom:10,
        borderRadius:20,
        width:300,
        height:265,
        color:'white',
        marginLeft:10,          
    },
    s1:{
        height:180,
        width:"100%",
    },

    cardimgin:{
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        width:'100%',
        height:'100%',
    },
    
   
    s2in:{
        flex:0,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        color:'white',
        marginLeft:10,
        marginRight:10,

        
    },
    txt1:{
        
        fontWeight:'bold',
       fontSize:20,
        color:'white',

        
    },
    txt2:{
       
        color:'white',
        fontSize:15,

        
    },

    buybtn:{
        backgroundColor:'#f5b013',
        width:90,
        height:30,
        borderRadius:20,
        justifyContent:'center',
        textAlign:'center',
        fontSize:20,
        
    },
    s2:{
        marginLeft:10,
    },
    vegnonveg:{
      color:'white',
      marginLeft:5,
    },
    vegNonVeg:{
        flex:0,
        flexDirection:'row',
    },
    cardouthead:{
     fontSize:24,
     color:'#f5b013',
     marginBottom:10,
     marginLeft:10,
    },
})