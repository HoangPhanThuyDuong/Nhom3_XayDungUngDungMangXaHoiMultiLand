import { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View,Image } from "react-native"
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { SafeAreaView } from "react-native-safe-area-context"
import { TouchableHighlight } from "react-native-gesture-handler"


export default FriendScreen = ({navigation}) => {
  const [followings, setFollowings] = useState([])
  const [suggests, setSuggests] = useState([])
  const [users, setUsers] = useState([])
  const [isReddy, setIsReddy] = useState(false);
  setTimeout(()=>{setIsReddy(true)},3000)
  const GetResult = () => {
  
     firestore().collection('followings').doc(auth().currentUser.uid).onSnapshot(documentSnapshot => {
      let arr = [];
      let temp = documentSnapshot.data().data;
      temp.forEach(value => {
        value.ref.get().then(res => {
          arr.push(res.data());
        });
      });
      setFollowings(arr);
    })

  firestore().collection('users').onSnapshot( documentSnapshot=> {
      let arr_temp = [];
        documentSnapshot.forEach(item => { 
          if(item.data().uid != auth().currentUser.uid) 
            arr_temp.push(item.data())
        })
        setUsers(arr_temp);
    });
  }

  const update = () => {
    let arr = [];
    users.forEach(item =>{ 
      console.log(item.name)
      let isExists = false;
      followings.forEach(value => {
       
        if(item.uid == value.uid  ) {   
          isExists = true;
          console.log(item.name + " " + value.name)
        }
      })
      if(isExists == false) arr.push(item);
    })
    setSuggests(arr);
  }
  useEffect(()=>{
    update();
  },[isReddy])

  
  useEffect(()=>{GetResult()},[])


  const GetImage =({source}) => {
    if(source=="") {  return; }
    else {  return ( <Image source={{uri:source}}  style={styles.avatar} />  )  }
  }

  const goToProfile = (item) => {
      navigation.navigate('NavigationOtherScreen',{name:'UserProfile', user:item})
  }

  const GetItem = ({item}) => {
    return  (
    <TouchableHighlight underlayColor='#eee' onPress={()=>{goToProfile(item)}}>
        <View style={styles.item_container}>
        <View style={styles.item_avatar}>
            <GetImage source={item.avatar} />
        </View>
        <TouchableHighlight style={styles.item_name} underlayColor='#eee' onPress={()=>{}}>
            <Text style={styles.name}>{item.name}</Text>
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
    )
  }


  return (
    <View>
      <Text style={ {margin:30,
        paddingBottom:5,
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        color:'#ff22d0',
        borderBottomColor:'#ddd',
        borderBottomWidth:2,}}> Những người bạn có thể biết</Text>
      <SafeAreaView style={styles.container_area}>
          <FlatList data={suggests} horizontal={false}
              renderItem={({item}) =>(
                <GetItem item ={item} />
              )} />
      </SafeAreaView>
    
    </View>
  )
}
const styles = StyleSheet.create({

    container_area: {
     
      width:'100%',
      height:'90%',

    },

    item_container: {
      flexDirection:'row',
      alignItems:'flex-start',
      width:'100%',
      padding: 20,
     
      
    },
    item_avatar: {
     marginRight:20,
    },
    item_name: {
      marginTop:10,
    },

    name: {
      fontSize:16,
    },
    avatar: {
      width:50,
      height:50,
      borderRadius:25,
    }

    
})