import { StyleSheet, Text, View, ScrollView ,TextInput,FlatList,TouchableOpacity} from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import { firebase } from '../../firebase/FirebaseConfig'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const BottomSearch = ({navigation}) => {
    const [foodData, setfoodData] = useState([]);
    const foodRef = firebase.firestore().collection('FoodData')
    useEffect(() => {
        foodRef.onSnapshot(snapshot => {
          setfoodData(snapshot.docs.map(doc => doc.data()))
        })
      }, [])

      const [search, setsearch] = useState('')

      const openProductPage =(item) =>{
        navigation.navigate('ProductPage',item)
    }
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.back}>
                <View>
                    <Entypo name="back" size={30} color="black"  onPress={() => navigation.navigate('HomeScreen')} />
                </View>
            </TouchableOpacity>

      <ScrollView>
      <View style={styles.searchbar}>
        <FontAwesome5 name="search" size={35} color="black" />
        <TextInput style={styles.search1} placeholder='search' onChangeText={(text) => { setsearch(text) }} />
      </View>
      {search != '' && <View style={styles.searchresultouter}>
        <FlatList style={styles.searchresultinner}
          data={foodData}
          renderItem={({ item }) => {
            if (item.FOODname.toLowerCase().includes(search.toLocaleLowerCase())) {
              return (
                <View style={styles.searchresult}>
                  <AntDesign name="arrowright" size={24} color="black" />
                  <Text style={styles.searchresulttext} key={item.index} onPress={()=>{
                        openProductPage(item)}}>{item.FOODname}</Text>
                </View>
              )
            }
          }}
        />
      </View>}
      </ScrollView>
    </View>
  )
}

export default BottomSearch

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#545554',
        // alignItems:'center',
    
    
      },
      searchbar: {
        flex: 0,
        flexDirection: 'row',
        marginTop: 10,
        width: '98%',
        backgroundColor: '#f5b013',
        height: 50,
        borderRadius: 10,
        elevation: 30,
        marginLeft: 4,
      },
      search1: {
        fontSize: 20,
      },
      searchresultouter:{
        width:'100%',
        marginHorizontal:30,
        // height: '100%',
       
      },
      searchresultinner:{
        width:'100%',
    
      },
    
      searchresult:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        padding:5,
      },
    
      searchresulttext:{
       marginLeft:10,
       fontSize:18,
       color:'#f5b013',
      },
      back: {

        marginLeft: 4,
        marginTop: 4,
        width: '100%',
        // zIndex:10,
    },
})